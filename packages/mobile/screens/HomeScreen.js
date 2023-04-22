import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";

//const usersCollection = firestore().collection("users");

export default function HomeScreen() {
  const userId = "bMacFrTg7HGIQoaKAilu";
  const [user, setUser] = useState(null);
  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot({
        next: (documentSnapshot) => {
          console.log("User data: ", documentSnapshot.data());
          setUser(documentSnapshot.data());
        },
        error: (error) => {
          console.error(error);
        },
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userId]);
  const buttonCallback = () => {
    const names = ["John", "Jane", "James", "Judy"];
    firestore()
      .collection("users")
      .doc(userId)
      .update({
        name: names[Math.floor(Math.random() * names.length)],
      })
      .then(() => {
        console.log("User updated!");
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home</Text>
      <Text>{user?.name}</Text>
      <Button title={"Update Name"} onPress={buttonCallback} />
    </View>
  );
}
