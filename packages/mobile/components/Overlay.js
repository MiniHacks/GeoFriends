import MapView, {Geojson, PROVIDER_GOOGLE} from "react-native-maps";
import {Dimensions, StyleSheet, View} from "react-native";
import {State} from 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from "react"; // remove PROVIDER_GOOGLE import if not using Google Maps

const SAMPLE_DATA = {"welsar55":{"type":"MultiPolygon","coordinates":[[[[0.9,-3.231089149e-16],[0.929289322,0.070710678],[1,0.1],[1.070710678,0.070710678],[1.1,0],[1.070710678,-0.070710678],[1,-0.1],[0.929289322,-0.070710678],[0.9,-3.231089149e-16]]],[[[2.929289322,0.070710678],[3,0.1],[3.025,0.089644661],[3.05,0.1],[3.120710678,0.070710678],[3.15,0],[3.120710678,-0.070710678],[3.05,-0.1],[3.025,-0.089644661],[3,-0.1],[2.929289322,-0.070710678],[2.9,-3.231089149e-16],[2.929289322,0.070710678]]],[[[2,-0.1],[1.961731657,-0.092387953],[1.929289322,-0.070710678],[1.907612047,-0.038268343],[1.9,-3.231089149e-16],[1.907612047,0.038268343],[1.929289322,0.070710678],[1.961731657,0.092387953],[2,0.1],[2.033778833,0.093280972],[1.979289322,0.070710678],[1.95,-3.231089149e-16],[1.979289322,-0.070710678],[2.033778833,-0.093280972],[2,-0.1]]],[[[2.1,0.1],[2.170710678,0.070710678],[2.2,0],[2.170710678,-0.070710678],[2.1,-0.1],[2.075,-0.089644661],[2.120710678,-0.070710678],[2.15,0],[2.120710678,0.070710678],[2.075,0.089644661],[2.1,0.1]]]]},"welsar56":{"type":"Polygon","coordinates":[[[2.15,0],[2.120710678,-0.070710678],[2.05,-0.1],[1.979289322,-0.070710678],[1.95,-3.231089149e-16],[1.979289322,0.070710678],[2.05,0.1],[2.120710678,0.070710678],[2.15,0]]]}}

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 34.052235;
const LONGITUDE = -118.243683;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get("window").height - 20,
    width: Dimensions.get("window").width,
    justifyContent: "flex-end",
    alignItems: "center",
  }, map: {
    ...StyleSheet.absoluteFillObject,
  },
});


const Map = () => {
  const mapRef = useRef(null);


  const [circle, setCircle] = useState({
    center: {
      latitude: LATITUDE + SPACE, longitude: LONGITUDE + SPACE,
    }, radius: 700,
  });

  const [region, setRegion] = useState({
    latitude: LATITUDE, longitude: LONGITUDE, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA,
  });


  const onPinchEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const {scale} = event.nativeEvent;
      const newLatitudeDelta = region.latitudeDelta / scale;
      const newLongitudeDelta = region.longitudeDelta / scale;

      setRegion({
        ...region, latitudeDelta: newLatitudeDelta, longitudeDelta: newLongitudeDelta,
      });
    }
  };

  const onPanResponderMove = (event, gestureState) => {
    const dx = -gestureState.dx;
    const dy = -gestureState.dy;
    const {latitude, longitude, latitudeDelta, longitudeDelta} = region;
    const lat = latitude - (dy * latitudeDelta * 2) / 667;
    const lng = longitude + (dx * longitudeDelta * 2) / 375;
    setRegion({...region, latitude: lat, longitude: lng});
    mapRef.current.animateToRegion(region, 0);
  };


  const GROUP = "welsar-friends";
  const [geostate, setGeostate] = useState(SAMPLE_DATA);

  useEffect(() => {
    fetch("http://172.190.74.123:8000/get_group_geom/" + GROUP).then((response) => {
      response.json().then((data) => {
        //   iterate through every object in data
        setGeostate(data);
      });
    });
  }, []);

  const template = shit => ({
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": shit
      }
    ]
  })


  const polygons = geostate && Object.entries(geostate).map(([user, geometry]) => {
    return (<Geojson
      key={user}
      strokeColor="red"
      fillColor="green"
      strokeWidth={2}
      geojson={template(geometry)}
    />);
  });

  return (

    <View style={styles.container}>
      <MapView style={styles.map} ref={mapRef} initialRegion={region}
               provider={PROVIDER_GOOGLE}>
        {polygons}
      </MapView>
    </View>);
};

export default Map;
