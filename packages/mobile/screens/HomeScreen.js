import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";

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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello World!</Text>
      <Text>{user?.name}</Text>
    </View>
  );
}
