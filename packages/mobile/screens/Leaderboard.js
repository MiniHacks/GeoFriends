import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Image, ImageBackground, FlatList, TextInput } from "react-native";
import Overlay from "../components/Overlay";
const leaderboard_styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 85,
    width: 228,
    height: 300,
    backgroundColor: "rgba(234, 240, 241, 0.8)",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    overflow: "hidden",
    borderRadius: 15,
  },
  gradient: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
});

const title_styles = StyleSheet.create({
  rectangle: {
    position: "absolute",
    width: 228,
    height: 35,
    top: 85,
    backgroundColor: "#EAF0F1",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
export default function Leaderboard() {

  // const GROUP = "welsar-friends";
  //
  // fetch("http://172.190.74.123:8000/get_group_geom/" + GROUP).then((response) => {
  //   response.json().then((data) => {
  //     console.log(data);
  //   });
  // });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Overlay />
      <View style={leaderboard_styles.container}>
        <LinearGradient
          colors={["rgba(260, 260, 260, 0.9)", "rgba(233, 238, 240, 0.3)"]}
          locations={[0, 1]}
          style={leaderboard_styles.gradient}
        />
      </View>
      <View style={title_styles.rectangle}>
        <Text
          style={{
            position: "absolute",
            fontFamily: "Raleway",
            fontSize: 15,
            color: "black",
            marginTop: 10,
          }}
        >
          LEADERBOARD
        </Text>
      </View>
      <Text>Settings</Text>
    </View>

  );
}
