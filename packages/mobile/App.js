import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import SettingsScreen from "./screens/SettingsScreen";
import HomeScreen from "./screens/HomeScreen";
import Leaderboard from "./screens/Leaderboard";
import auth from "@react-native-firebase/auth";
import Geolocation from 'react-native-geolocation-service';
import ExpoCamera from "./screens/ExpoCamera";

const Tab = createBottomTabNavigator();

function MyTabs() {

  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [location, setLocation] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          setLocation(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          setLocation(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
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
      } else {
        console.log('You cannot use Geolocation');
      }
    } catch (err) {
      return false;
    }

    // const backgroundgranted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
    //   {
    //     title: 'Background Location Permission',
    //     message:
    //       'We need access to your location ' +
    //       'so you can get live quality updates.',
    //     buttonNeutral: 'Ask Me Later',
    //     buttonNegative: 'Cancel',
    //     buttonPositive: 'OK',
    //   },
    // );
    // if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
    //   //do your thing!
    // }
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

  useEffect(() => {
    if (user) {

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
    <Tab.Navigator
      initialRouteName="Leaderboard"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "HomeScreen",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          tabBarLabel: "Leaderboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ExpoCamera"
        component={ExpoCamera}
        options={{
          tabBarLabel: "ExpoCamera",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
