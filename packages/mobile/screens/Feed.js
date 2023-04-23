import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { ColorPicker } from "react-native-color-picker";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const currentUser = auth().currentUser;

  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    circle: {
      width: 45,
      height: 45,
      borderRadius: 25,
      margin: 3,
    },
  });

  const [borderColor, setBorderColor] = useState("transparent");

  const navigation = useNavigation();
  const save = () => {
    navigation.navigate("EditProfile");
  };

  useFocusEffect(
    React.useCallback(() => {
      // Your code to run when the screen is focused
      const unsubscribe = firestore()
        .collection("users")
        .doc(currentUser.uid)
        .onSnapshot((documentSnapshot) => {
          setBorderColor(documentSnapshot.data().borderColor);
        });

        unsubscribe();

      return () => {};
    }, [])
  );

  useEffect(() => {
    // Reference to the "geofriends" folder in Firebase Storage
    const geofriendsRef = storage().ref().child('geofriends');

    // List all the files in the "geofriends" folder
    geofriendsRef.listAll().then((result) => {
      result.items.forEach((itemRef) => {
        // Get the download URL for each file in the folder
        itemRef.getDownloadURL().then((url) => {
          console.log('File download URL:', url);
        }).catch((error) => {
          console.error('Error getting file download URL:', error);
        });
      });
    }).catch((error) => {
      console.error('Error listing files in "geofriends" folder:', error);
    });
  }, []);
  

  return (
    <>
      <StatusBar />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#EAF0F1" }}>
        <View style={{ flex: 1 }}>
          {/*Add text at the top of the screen that says Profile, with 50
       pixels of white space above it*/}
          <View style={{ alignItems: "center", marginTop: 50 }}>
            {/*Add a circle that will be the profile picture, with a width and height of 100 pixels
             */}
            {/* If the userprofile picture exists, create a 100 by 100 Image circle of it with radius 50
             with the border color of borderColor*/}
            {/*Add a flatlist that will display the colors in a circle and in 2 x 5 grid
             */}
            <View style={{ flexDirection: "row" }}>
              <View style={{ alignItems: "center" }}>
                {currentUser.photoURL ? (
                  <Image
                    source={{ uri: currentUser.photoURL }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 80 / 2,
                      borderColor: borderColor,
                      borderWidth: 3,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      borderRadius: 80 / 2,
                      borderColor: borderColor,
                      backgroundColor: "white",
                      borderWidth: 3,
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  position: "relative",
                  fontSize: 25,
                  fontWeight: 500,
                  top: 20,
                  margin: 5,
                }}
              >
                {currentUser.displayName}
              </Text>
            </View>
          </View>
          {/*Add a textInput that asks the user for their address using #00364A
             as the border color with a 2 pixel border with rounded edges */}
          <Pressable
            style={{
              alignSelf: "center",
              backgroundColor: "#00364A",
              padding: 10,
              paddingHorizontal: 20,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              position: "relative",
              bottom: 0,
            }}
            onPress={save}
          >
            <Text
              style={{
                fontFamily: "Raleway",
                fontSize: 15,
                color: "#EAF0F1",
              }}
            >
              Edit Profile
            </Text>
          </Pressable>
          <Text
            style={{
              position: "relative",
              fontSize: 25,
              fontWeight: 500,
              margin: 30,
              color: "black",
              alignSelf: "center",
            }}
          >
            Recent Activity:
          </Text>
        </View>

        {/*finish closing all the tags*/}
      </SafeAreaView>
    </>
  );
}
