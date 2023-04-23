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
import { ColorPicker } from "react-native-color-picker";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function EditProfile() {
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
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.color)}>
      <View
        style={[
          styles.circle,
          { backgroundColor: item.hex },
          item.isCustom && {
            borderWidth: 4,
            borderColor: "black",
            borderRadius: 10,
          },
        ]}
      />
    </TouchableOpacity>
  );

  const [color, setColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const overlayOpacity = showColorPicker ? 0.5 : 0;
  const handlePress = (color) => {
    if (color === "green") {
      setShowColorPicker(true);
    } else {
      setBorderColor(colors.find((c) => c.color === color).hex);
    }
  };
  const colors = [
    { color: "red", hex: "#CC2936" },
    { color: "orange", hex: "#EE5622" },
    { color: "dark_blue", hex: "#4F4789" },
    { color: "pink", hex: "#FC6DAB" },
    { color: "pome", hex: "#B33C86" },
    { color: "almost_tan", hex: "#FE5F55" },
    { color: "orange_yellow", hex: "#F49F0A" },
    { color: "hot_pink_kinda", hex: "#E63462" },
    { color: "yellow", hex: "#FDCA40" },
    { color: "green", hex: color, isCustom: true },
  ];

  const [borderColor, setBorderColor] = useState("transparent");

  const [loggedIn, setLoggedIn] = useState(false);
  const [location, setLocation] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const userRef = firestore().collection("users").doc(currentUser.uid);

  const [userAddress, setUserAddress] = useState(null);
  const handleColorChange = (newColor = "#000000") => {
    setColor(newColor);
    setShowColorPicker(false);
    setBorderColor(newColor);
  };

  useEffect(() => {
    const updateUser = async () => {
      try {
        const doc = await userRef.get();
        if (doc.exists) {
          await userRef.update({
            color: borderColor,
          });
          console.log("User updated!");
        } else {
          await userRef.set({
            color: borderColor,
          });
          console.log("New user created!");
        }
      } catch (error) {
        console.error("Something went wrong with Firestore.", error);
      }
    };
    updateUser();
  }, [borderColor]);

  useEffect(() => {
    const updateUser = async () => {
      try {
        const doc = await userRef.get();
        if (doc.exists) {
          await userRef.update({
            address: location,
          });
          console.log("User location updated!");
        } else {
          await userRef.set({
            address: location,
          });
          console.log("New user created!");
        }
      } catch (error) {
        console.error("Something went wrong with Firestore.", error);
      }
    };
    updateUser();
  }, [location]);

  const navigation = useNavigation();
  const save = () => {
    navigation.navigate("Profile");
  };
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#EAF0F1" }}>
        <View style={{ flex: 1, top: -2 }}>
          {/*Add text at the top of the screen that says Profile, with 50
       pixels of white space above it*/}
          <View style={{ alignItems: "center", marginTop: 100 }}>
            <Text
              style={{
                color: "#00364A",
                fontSize: 35,
                fontWeight: "bold",
                fontFamily: "Raleway",
              }}
            >
              Edit Profile
            </Text>
            {/*Add a circle that will be the profile picture, with a width and height of 100 pixels
             */}

            {/* If the userprofile picture exists, create a 100 by 100 Image circle of it with radius 50
             with the border color of borderColor*/}

            {/*Add a flatlist that will display the colors in a circle and in 2 x 5 grid
             */}
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
                    margin: "7%",
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 80 / 2,
                    borderColor: borderColor,
                    backgroundColor: "white",
                    borderWidth: 3,
                    margin: "7%",
                  }}
                />
              )}
            </View>

            <FlatList
              data={colors}
              renderItem={renderItem}
              keyExtractor={(item) => item.color}
              numColumns={5}
            />

            {showColorPicker && (
              <Modal transparent={true} visible={showColorPicker}>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "black",
                    opacity: overlayOpacity,
                  }}
                  onPress={() => setShowColorPicker(false)}
                />
                <View
                  style={{
                    flex: 1,
                    position: "absolute",
                    top: "50%",
                    left: "75%",
                    transform: [{ translateX: -250 }, { translateY: -250 }],
                    width: 200,
                    height: 450,
                    borderRadius: 20,
                  }}
                >
                  <ColorPicker
                    onColorSelected={handleColorChange}
                    style={{ flex: 1 }}
                  />
                </View>
              </Modal>
            )}

            {/*Add a textInput that asks the user for their address using #00364A
             as the border color with a 2 pixel border with rounded edges */}
            <TextInput
              style={{
                height: 50,
                borderColor: "#00364A",
                borderWidth: 2,
                borderRadius: 10,
                width: 300,
                position: "relative",
                bottom: -40,
                fontSize: 20,
              }}
              onChangeText={(text) => setLocation(text)}
              value={location}
              placeholder="   Edit Address"
            />
          </View>
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
              bottom: -60,
            }}
            onPress={save}
          >
            <Text
              style={{
                fontFamily: "Raleway",
                fontSize: 20,
                color: "#EAF0F1",
              }}
            >
              Save
            </Text>
          </Pressable>

          {/*finish closing all the tags*/}
        </View>
      </SafeAreaView>
    </>
  );
}
