import React, { useEffect, useState } from "react";
import { Text, View, ImageBackground, Button, StyleSheet, TouchableOpacity} from "react-native";
import firestore from "@react-native-firebase/firestore";
import SignUp from "./SignUp";

//const usersCollection = firestore().collection("users");

export default function HomeScreen() {
  const userId = "bMacFrTg7HGIQoaKAilu";
  const [user, setUser] = useState(null);
  function User({ userId }) {
    useEffect(() => {
      const subscriber = firestore()
        .collection("users")
        .doc(userId)
        .onSnapshot((documentSnapshot) => {
          console.log("User data: ", documentSnapshot.data());
          setUser(documentSnapshot.data());
        });

      // Stop listening for updates when no longer required
      return () => subscriber();
    }, [userId]);
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: 191,
      height: 42,
    },
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* import the background image from assets */}
      <ImageBackground source={require("../assets/homescreen_background.png")} style={{flex: 1, width: "100%", height: "100%",
        position: "absolute" }}/>

      {/*Add centered sign in text using raleway font using size 35, black color*/}


      {/*Create a touchableOpacity button with a text inside with rounded corners that uses the sign_in_button.png*/}
      <TouchableOpacity style={styles.button} onPress={() => console.log("pressed")}>
        <ImageBackground source={require("../assets/sign_in_button.png")} style={{flex: 1, width: "100%", height: "100%",
          position: "absolute" }}/>
      </TouchableOpacity>
      {/*Add text that says if you don't have an account sign up, with the sign up being a hyperlink and they
       are on the same line*/}
      <Text style={{fontFamily: "Raleway", fontSize: 15, color: "black", marginTop: 10}}>Don't have an account? </Text>
      <TouchableOpacity onPress={() => console.log("pressed")}>
        {/* add underline */}
        <Text style={{fontFamily: "Raleway", fontSize: 15, color: "black", marginTop: 10, textDecorationLine: 'underline'}}>sign up</Text>
      </TouchableOpacity>

      {/*Add a button that will take the user to the SignUp screen */}


      <Text>{user?.name}</Text>
    </View>
  );
}
