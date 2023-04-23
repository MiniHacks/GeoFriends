import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { firebase } from "@react-native-firebase/auth";
import { StatusBar } from "expo-status-bar";

export default function Leaderboard() {
  const [isEnabled, setIsEnabled] = useState(true);
  const GROUP = "welsar-friends";
  const [geostate, setGeostate] = useState([]);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 70,
      left: 50,
    },
  });

  const styles1 = StyleSheet.create({
    scrollView: {
      marginHorizontal: 20,
      alignItems: "center",
      alignContent: "center",
    },
  });
  const styles2 = StyleSheet.create({
    contentContainer: {
      paddingVertical: 20,
    },
  });
  const styles3 = StyleSheet.create({
    contentContainer: {
      paddingVertical: 20,
      alignItems: "center",
      alignContent: "center",
    },
  });

  useEffect(() => {
    fetch("http://172.190.74.123:8000/get_group_geom/" + GROUP).then((response) => {
      response.json().then((data) => {
        //   iterate through every object in data
        setGeostate(data);
      });
    });
  }, []);

  if (!isEnabled) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageBackground
          source={require("../assets/UCLASampleMap.png")}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
        <View style={styles.container}>
          <Switch
            trackColor={{ false: "#74868B", true: "#49575B" }}
            thumbColor={isEnabled ? "#022A38" : "#A6BBC0"}
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scaleX: 1.6 }, { scaleY: 1.5 }] }}
          />
        </View>
        <View
          style={{
            bottom: 0,
            position: "absolute",
            width: 360,
            height: 120,
            backgroundColor: "rgba(233, 238, 240, 0.9)",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignItems: "center",
            borderColor: "rgba(100,100,100,0.5)",
            borderWidth: 2,
          }}
        >
          <SafeAreaView style={styles1.container}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles2.contentContainer}
            >
              <Text style={{ margin: 30, height: 50 }}>
                many many many many manyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy profile
                pictures once daniel figures it out! yay!
              </Text>
            </ScrollView>
          </SafeAreaView>
        </View>
        <Text
          style={{
            position: "absolute",
            bottom: 70,
            fontFamily: "Raleway",
            fontSize: 25,
            color: "black",
            marginTop: 10,
          }}
        >
          Who was here?
        </Text>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageBackground
          source={require("../assets/UCLASampleMap.png")}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
        <View style={styles.container}>
          <Switch
            trackColor={{ false: "#74868B", true: "#49575B" }}
            thumbColor={isEnabled ? "#022A38" : "#A6BBC0"}
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scaleX: 1.6 }, { scaleY: 1.5 }] }}
          />
        </View>
        <View
          style={{
            bottom: 0,
            position: "absolute",
            width: 360,
            height: 120,
            backgroundColor: "rgba(233, 238, 240, 0.9)",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignItems: "center",
            borderColor: "rgba(100,100,100,0.5)",
            borderWidth: 2,
          }}
        >
          <SafeAreaView style={styles1.container}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles2.contentContainer}
            >
              <Text style={{ margin: 30, height: 50 }}>
                many many many many manyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy profile
                pictures once daniel figures it out! yay!
              </Text>
            </ScrollView>
          </SafeAreaView>
        </View>

        <View>
          <View
            style={{
              position: "absolute",
              width: 230,
              height: 350,
              alignSelf: "center",
              bottom: 190,
              backgroundColor: "rgba(233, 238, 240, 0.9)",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderColor: "rgba(100,100,100,0.5)",
              borderWidth: 2,
            }}
          ></View>

          <SafeAreaView style={styles1.container}>
            <ScrollView contentContainerStyle={styles3.contentContainer}>
              <Text
                style={{
                  height: 100,
                  margin: 30,
                  position: "relative",
                  fontFamily: "Raleway",
                  top: 100,
                }}
              >
              {geostate && Object.entries(geostate).map(([user, geometry]) => {
                console.log(geometry)
                  return (
                    <Text key={user}>
                      {user} + {(geometry.area * 1000000).toFixed(2)}
                    </Text>
                  );
                })}
              </Text>
            </ScrollView>
          </SafeAreaView>
        </View>
        <Text
          style={{
            position: "absolute",
            bottom: 70,
            fontFamily: "Raleway",
            fontSize: 25,
            color: "black",
            marginTop: 10,
          }}
        >
          Who was here?
        </Text>
      </View>
    );
  }
}
