import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  ImageBackground,
  Button,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
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
import "../components/backgroundService";

GoogleSignin.configure({
  webClientId: "",
});
import Geolocation from 'react-native-geolocation-service';
//const usersCollection = firestore().collection("users");

export default function HomeScreen() {
  /*Google Authentication*/
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const navigation = useNavigation();
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
      {
        /*switch screens to leaderboard.js */
      }
      navigation.navigate("Leaderboard");
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
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/homescreen_background.png")}
        style={{ flex: 1, height: "100%", justifyContent: "center" }}
      >
        <View style={{ alignItems: "center" }}>
          {/* Add text that says "Sign In" */}
          <Text
            style={{
              fontFamily: "Raleway",
              fontSize: 35,
              color: "black",
              marginBottom: 30,
            }}
          >
            Sign In
          </Text>

          {/* Add Google sign-in button */}
          <View style={{ width: "80%" }}>
            <GoogleSigninButton
              style={{ alignSelf: "center" }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
            />
          </View>

          {/* Add logged in status and log out button */}
          <View>{!loggedIn && <Text>You are currently logged out</Text>}</View>
        </View>
      </ImageBackground>
    </View>
  );
}
