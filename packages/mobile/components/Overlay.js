import MapView, {Circle, Polyline, Polygon, PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View, StyleSheet, Dimensions, PanResponder, Animated } from "react-native";
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import React, { useState, useRef } from "react"; // remove PROVIDER_GOOGLE import if not using Google Maps

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get("window").height - 20,
    width: Dimensions.get("window").width,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


const Map = () => {
  const mapRef = useRef(null);

  const [circle, setCircle] = useState({
    center: {
      latitude: LATITUDE + SPACE,
      longitude: LONGITUDE + SPACE,
    },
    radius: 700,
  });

  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });


  const onPinchEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const { scale } = event.nativeEvent;
      const newLatitudeDelta = region.latitudeDelta / scale;
      const newLongitudeDelta = region.longitudeDelta / scale;

      setRegion({
        ...region,
        latitudeDelta: newLatitudeDelta,
        longitudeDelta: newLongitudeDelta,
      });
    }
  };

  const onPanResponderMove = (event, gestureState) => {
    const dx = -gestureState.dx;
    const dy = -gestureState.dy;
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    const lat = latitude - (dy * latitudeDelta * 2) / 667;
    const lng = longitude + (dx * longitudeDelta * 2) / 375;
    setRegion({ ...region, latitude: lat, longitude: lng });
    mapRef.current.animateToRegion(region, 0);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove,
  });

  return (

    <PinchGestureHandler onGestureEvent={onPinchEvent}>
      <View style={styles.container} {...panResponder.panHandlers}>
        <MapView style={styles.map} ref={mapRef} initialRegion={region}
          provider={PROVIDER_GOOGLE}>
          <Polygon
            coordinates={[
              { latitude: 37.8025259, longitude: -122.4351431 },
              { latitude: 37.7896386, longitude: -122.421646 },
              { latitude: 37.7665248, longitude: -122.4161628 },
              { latitude: 37.7734153, longitude: -122.4577787 },
              { latitude: 37.7948605, longitude: -122.4596065 },
              { latitude: 37.8025259, longitude: -122.4351431 },
            ]}
          />
          <Circle
            center={circle.center}
            radius={circle.radius}
            fillColor="rgba(255, 255, 255, 1)"
            strokeColor="rgba(0,0,0,0.5)"
            zIndex={2}
            strokeWidth={2}
          />
        </MapView>
      </View>
    </PinchGestureHandler>
  );
};

export default Map;
