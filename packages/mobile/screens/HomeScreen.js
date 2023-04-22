import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Button,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import SignUp from "./SignUp";
import { SafeAreaView, ScrollView } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { StatusBar } from "expo-status-bar";
import { Header } from "react-native/Libraries/NewAppScreen";

GoogleSignin.configure({
  webClientId: "",
});
import Geolocation from 'react-native-geolocation-service';
//const usersCollection = firestore().collection("users");

export default function HomeScreen() {
  /*Google Authentication*/
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  // state to hold location
  const [location, setLocation] = useState(false);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      setloggedIn(true);
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      await auth().signInWithCredential(credential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // login already in progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["email"], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        "287286374960-stseuc60degmgj611mva12pr182cjl4h.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  // Function to get permission for location
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  requestLocationPermission();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const apiUrl = "http://172.190.74.123:8000";
  const groupid = "welsar-friends";

  console.log("At use effect");

  useEffect(() => {
    console.log("User:");
    console.log(user);

    if (user) {
      console.log("Hi");

      const getTokenAndPingLocation = async () => {
        try {
          const token = await user.getIdToken();
          console.log(token);

          if (!location)
            return;

          const pingData = {
            userid: user.uid,
            groupid: groupid,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };

          const response = await fetch(`${apiUrl}/ping_location`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(pingData),
          });
          // console.log(response)
          const responseData = await response.json();
          console.log(responseData);
        } catch (error) {
          console.log(error);
        }
      };

      getTokenAndPingLocation();
    }
  }, [user, location]);


  if (initializing) return null;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* import the background image from assets */}
      <ImageBackground
        source={require("../assets/homescreen_background.png")}
        style={{ flex: 1, width: "100%", height: "100%", position: "absolute" }}
      />

      {/*Add centered sign in text using raleway font using size 35, black color*/}
      <Text style={{ fontFamily: "Raleway", fontSize: 35, color: "black" }}>
        Sign In
      </Text>

      {/*Create a touchableOpacity button with a text inside with rounded corners that uses the sign_in_button.png*/}
      <TouchableOpacity
        // style={styles.button}
        onPress={() => console.log("pressed")}
      >
        <ImageBackground
          source={require("../assets/sign_in_button.png")}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
      </TouchableOpacity>
      {/*Add text that says if you don't have an account sign up, with the sign up being a hyperlink and they
       are on the same line*/}
      <Text
        style={{
          fontFamily: "Raleway",
          fontSize: 15,
          color: "black",
          marginTop: 10,
        }}
      >
        Don't have an account?{" "}
      </Text>
      <TouchableOpacity onPress={() => console.log("pressed")}>
        {/* add underline */}
        <Text
          style={{
            fontFamily: "Raleway",
            fontSize: 15,
            color: "black",
            marginTop: 10,
            textDecorationLine: "underline",
          }}
        >
          sign up
        </Text>
      </TouchableOpacity>

      {/*Add a button that will take the user to the SignUp screen */}

      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <View>
              <GoogleSigninButton
                style={{ width: 192, height: 48, margin: 150 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
              />
            <TouchableOpacity
              onPress={() => {
                Geolocation.getCurrentPosition(
                  position => {
                    console.log(position);
                    setLocation(position);
                  },
                  error => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                    setLocation(null);
                  },
                  { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
              }}>
              <Text>Click for location</Text>
            </TouchableOpacity>
            </View>
            <View>
              {!loggedIn && <Text>You are currently logged out</Text>}
              {loggedIn && (
                <Button onPress={signOut} title="LogOut" color="red"></Button>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
