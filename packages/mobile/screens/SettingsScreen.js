import { useState } from "react";
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
} from "react-native";
import { ColorPicker } from "react-native-color-picker";

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
    { color: "green", hex: "#ffffff" },
  ];

  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    circle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      margin: 5,
    },
  });
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.color)}>
      <View style={[styles.circle, { backgroundColor: item.hex }]} />
    </TouchableOpacity>
  );

  const [color, setColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const overlayOpacity = showColorPicker ? 0.5 : 0;

  const handleColorChange = (newColor = "#000000") => {
    setColor(newColor);
    setShowColorPicker(false);
    setBorderColor(newColor);
    console.log(newColor);
  };

  const handlePress = (color) => {
    if (color === "green") {
      setShowColorPicker(true);
    } else {
      setBorderColor(colors.find((c) => c.color === color).hex);
    }
  };

  const [borderColor, setBorderColor] = useState("transparent");

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
          borderColor: borderColor,
          borderWidth: 2,
        }}
      />
      {/*Add a flatlist that will display the colors in a circle and in 2 x 5 grid
       */}
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
              width: 300,
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
          height: 40,
          borderColor: "#00364A",
          borderWidth: 2,
          borderRadius: 10,
          marginTop: 50,
          width: 300,
        }}
        placeholder="Address"
      />
      {/*finish closing all the tags*/}
    </View>
  );
}
