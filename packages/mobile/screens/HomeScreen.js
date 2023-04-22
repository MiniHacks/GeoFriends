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
//const usersCollection = firestore().collection("users");

export default function HomeScreen() {
  /*Google Authentication*/
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const navigation = useNavigation();
  // state to hold location
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
