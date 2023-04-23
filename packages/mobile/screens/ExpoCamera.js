import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Geolocation from "react-native-geolocation-service";

const ExpoCamera = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera ref={(ref) => {setCameraRef(ref);}} style={styles.camera} type={type} ratio="16:9">
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={async () => {
              if (cameraRef) {
                let photo = await cameraRef.takePictureAsync();
                console.log(photo);
                const currentUser = auth().currentUser;
                if (!currentUser) {
                  console.log("No user signed in when uploading photo");
                  return;
                }
                
                // Upload photo to Firebase
                // Upload photo to Firebase
                let response = await fetch(photo.uri);
                let blob = await response.blob();

                const userRef = await firestore().collection('users').doc(currentUser.uid);
                await userRef.collection('photos').add({
                  image: blob,
                  timestamp: new Date(),
                });

                Geolocation.getCurrentPosition(
                  (position) => {
                    const user = auth().currentUser;
                    if (user) {
                      const getTokenAndPingLocation = async () => {
                        try {
                          const token = await user.getIdToken();
                          const apiUrl = "http://172.190.74.123:8000";
                          const groupid = "welsar-friends";
                
                          const pingData = {
                            userid: user.uid,
                            groupid: groupid,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            radius: 0.04
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
                  },
                  (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                  },
                  { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
              }
            }}>
            <View style={styles.captureCircle} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    left: '50%',
    marginLeft: -40 // half the width of the button
  },
  captureCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    alignSelf: 'center',
    borderColor: '#fff',
  },
});

export default ExpoCamera;
