import React from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function SettingsScreen() {
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
    { color: "green", hex: "#3AAFA9" },
  ];

  const handlePress = (color) => {
    // do something with the selected color, e.g. navigate to a new screen
    console.log(color);
  };

  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    circle: {
      width: 100, // adjust as needed
      height: 100, // adjust as needed
      borderRadius: 50,
      margin: 5,
    },
  });
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.color)}>
      <View style={[styles.circle, { backgroundColor: item.hex }]} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/*Add the Image Color so that it will fit fully on the screen */}
      <ImageBackground
        source={require("../assets/homescreen_background.png")}
        style={{ flex: 1, width: "100%", height: "100%", position: "absolute" }}
      />
      {/*Add text at the top of the screen that says Profile, with 50
       pixels of white space above it*/}
      <Text style={{ color: "white", fontSize: 30, marginTop: 70 }}>
        Profile
      </Text>

      {/*Add a circle that will be the profile picture, with a width and height of 100 pixels
       */}
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 100 / 2,
          backgroundColor: "white",
          marginTop: 50,
        }}
      />

      {/*Add a flatlist that will display the colors in a circle and in 2 x 5 grid
       */}
      <FlatList
        data={colors}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.color)}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                backgroundColor: item.hex,
                margin: 5,
              }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.color}
        numColumns={5}
      />

      {/*Add a textInput that asks the user for their address using #00364A
       as the border color with a 2 pixel border with rounded edges */}
      <TextInput
        style={{
          height: 40,
          width: 300,
          borderColor: "#00364A",
          borderWidth: 2,
          borderRadius: 10,
          marginTop: 50,
        }}
        placeholder="   Home Address"
      />
    </View>
  );
}
