import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  Image,
} from "react-native";
import Overlay from "../components/Overlay";
import LinearGradient from "react-native-linear-gradient";
import { firebase } from "@react-native-firebase/app";
import { firestore } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { StatusBar } from "expo-status-bar";

export default function Leaderboard() {
  const [isEnabled, setIsEnabled] = useState(false);
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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    return db.collection("users").onSnapshot((snapshot) => {
      const postData = [];
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
      setUsers(postData);
    });
  }, []);

  useEffect(() => {
    fetch("http://172.190.74.123:8000/get_group_geom/" + GROUP).then(
      (response) => {
        response.json().then((data) => {
          //   iterate through every object in data
          setGeostate(data);
        });
      }
    );
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
        <Overlay />
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
            height: 100,
            backgroundColor: "rgba(233, 238, 240, 0.9)",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
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
              <View
                style={{
                  margin: 20,
                  height: 50,
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                {users.length == 0 ? (
                  <Text>Loading...</Text>
                ) : (
                  users
                    .filter((e) => e.photoURL)
                    .map((user) => {
                      return (
                        <Image
                          key={user.id}
                          source={{
                            uri: user.photoURL,
                            referrerPolicy: "no-referrer",
                          }}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            marginHorizontal: 10,
                            borderColor: user.color ? user.color : "black",
                            borderWidth: 3,
                          }}
                        />
                      );
                    })
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
        <Text
          style={{
            position: "absolute",
            bottom: 70,
            fontFamily: "Raleway",
            fontSize: 20,
            color: "black",
            marginTop: 5,
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
        <Overlay />
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
            height: 100,
            backgroundColor: "rgba(233, 238, 240, 0.9)",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
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
              <View
                style={{
                  margin: 20,
                  height: 50,
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                {users.length == 0 ? (
                  <Text>Loading...</Text>
                ) : (
                  users
                    .filter((e) => e.photoURL)
                    .map((user) => {
                      return (
                        <Image
                          key={user.id}
                          source={{
                            uri: user.photoURL,
                            referrerPolicy: "no-referrer",
                          }}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            marginHorizontal: 10,
                            borderColor: user.color ? user.color : "black",
                            borderWidth: 3,
                          }}
                        />
                      );
                    })
                )}
              </View>
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
              <View
                style={{
                  height: 500,
                  margin: 30,
                  fontFamily: "Raleway",
                  top: 175,
                  pointerEvents: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
              {geostate &&
                Object.entries(geostate)
                  .sort(([, a], [, b]) => b.area - a.area) // Sort by geometry.area
                  .map(([user, geometry]) => {
                    console.log("geostate of ", geometry);
                    const firebaseUser = users.find((e) => e.id == user);
                    return firebaseUser ? (
                      <View
                        key={user}
                        style={{
                          padding: 10,
                          margin: 5,
                          backgroundColor: "#FFFFFF",
                          borderRadius: 10,
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <Image
                          key={firebaseUser.id}
                          source={{
                            uri: firebaseUser.photoURL,
                            referrerPolicy: "no-referrer",
                          }}
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 30,
                            marginHorizontal: 5,
                            borderColor: firebaseUser.color ? firebaseUser.color : "black",
                            borderWidth: 3,
                          }}
                        />
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            flexGrow: 1,
                            alignItems: "center",
                          }}
                        >
                          <Text>{firebaseUser.displayName}</Text>
                          <Text>{(geometry.area * 10000).toFixed(2)}</Text>
                        </View>
                      </View>
                    ) : <></>;
                  })}
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
        <Text
          style={{
            position: "absolute",
            bottom: 70,
            fontFamily: "Raleway",
            fontSize: 20,
            color: "black",
            marginTop: 5,
          }}
        >
          Who was here?
        </Text>
      </View>
    );
  }
}
