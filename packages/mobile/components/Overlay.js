import MapView, { Geojson, PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react"; // remove PROVIDER_GOOGLE import if not using Google Maps
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/app";

const SAMPLE_DATA = {
  "8z79y2pvzHOk3LqDsFCS9NZV4aP2": {
    area: 3.5529958611085784e-6,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-118.445721793, 34.071174007],
          [-118.4454289, 34.0704669],
          [-118.445721793, 34.069759793],
          [-118.4464289, 34.0694669],
          [-118.446488069, 34.069491409],
          [-118.4467988, 34.0693627],
          [-118.447505907, 34.069655593],
          [-118.4477988, 34.0703627],
          [-118.447505907, 34.071069807],
          [-118.4467988, 34.0713627],
          [-118.446739631, 34.071338191],
          [-118.4464289, 34.0714669],
          [-118.445721793, 34.071174007],
        ],
      ],
    },
  },
  UcypPIhqXOZNNlliXyNlCTNohrM2: {
    area: 4.311094711024409e-6,
    geometry: {
      type: "MultiPolygon",
      coordinates: [
        [
          [
            [-118.445915893, 34.069540393],
            [-118.446623, 34.0692475],
            [-118.446627437, 34.069249338],
            [-118.4472714, 34.0689826],
            [-118.447978507, 34.069275493],
            [-118.4482714, 34.0699826],
            [-118.448163784, 34.070242409],
            [-118.4481801, 34.0702818],
            [-118.447887207, 34.070988907],
            [-118.447846797, 34.071005645],
            [-118.447766207, 34.071200207],
            [-118.4470591, 34.0714931],
            [-118.446840996, 34.071402758],
            [-118.446847225, 34.071400178],
            [-118.446847771, 34.071399952],
            [-118.446848327, 34.071399722],
            [-118.446850584, 34.071398787],
            [-118.446809627, 34.071381822],
            [-118.446787143, 34.071391135],
            [-118.4467655, 34.0714001],
            [-118.446758139, 34.071397051],
            [-118.4466967, 34.0714225],
            [-118.446616396, 34.071389237],
            [-118.446739631, 34.071338191],
            [-118.4467988, 34.0713627],
            [-118.447505907, 34.071069807],
            [-118.4477988, 34.0703627],
            [-118.447505907, 34.069655593],
            [-118.4467988, 34.0693627],
            [-118.446488069, 34.069491409],
            [-118.4464289, 34.0694669],
            [-118.445846393, 34.069708182],
            [-118.445915893, 34.069540393],
          ],
          [
            [-118.447582107, 34.071116007],
            [-118.446878262, 34.071407549],
            [-118.4469216, 34.0714255],
            [-118.447628707, 34.071132607],
            [-118.44765064, 34.071079656],
            [-118.4476478, 34.071080832],
            [-118.447586088, 34.071106394],
            [-118.447582107, 34.071116007],
          ],
          [
            [-118.4469021, 34.0713484],
            [-118.446898308, 34.071346829],
            [-118.446845438, 34.071368729],
            [-118.4468642, 34.0713765],
            [-118.44686472, 34.071376285],
            [-118.4468959, 34.0713892],
            [-118.447155283, 34.07128176],
            [-118.447109133, 34.071262644],
            [-118.4469021, 34.0713484],
          ],
          [
            [-118.446890878, 34.069249261],
            [-118.447066028, 34.06932181],
            [-118.447159, 34.0692833],
            [-118.447721857, 34.069516443],
            [-118.447712807, 34.069494593],
            [-118.4470057, 34.0692017],
            [-118.446890878, 34.069249261],
          ],
        ],
        [
          [
            [-118.4493492, 34.0754472],
            [-118.450056307, 34.075740093],
            [-118.4503492, 34.0764472],
            [-118.450056307, 34.077154307],
            [-118.4493492, 34.0774472],
            [-118.448642093, 34.077154307],
            [-118.4483492, 34.0764472],
            [-118.448642093, 34.075740093],
            [-118.4493492, 34.0754472],
          ],
        ],
      ],
    },
  },
  lgz8VwS4hjbG0nJ856nAonahpx12: {
    area: 6.46108067025851e-8,
    geometry: {
      type: "MultiPolygon",
      coordinates: [
        [
          [
            [-118.4467618, 34.0714185],
            [-118.446734078, 34.071407017],
            [-118.446758139, 34.071397051],
            [-118.4467655, 34.0714001],
            [-118.446787143, 34.071391135],
            [-118.446808815, 34.071400112],
            [-118.4467777, 34.071413],
            [-118.446776389, 34.071412457],
            [-118.4467618, 34.0714185],
          ],
        ],
        [
          [
            [-118.44686472, 34.071376285],
            [-118.4468642, 34.0713765],
            [-118.446845438, 34.071368729],
            [-118.446898308, 34.071346829],
            [-118.4469021, 34.0713484],
            [-118.447109133, 34.071262644],
            [-118.447155283, 34.07128176],
            [-118.4468959, 34.0713892],
            [-118.44686472, 34.071376285],
          ],
        ],
        [
          [
            [-118.447582107, 34.071116007],
            [-118.447586088, 34.071106394],
            [-118.44765064, 34.071079656],
            [-118.447628707, 34.071132607],
            [-118.4469216, 34.0714255],
            [-118.446878262, 34.071407549],
            [-118.447582107, 34.071116007],
          ],
        ],
        [
          [
            [-118.447712807, 34.069494593],
            [-118.447721857, 34.069516443],
            [-118.447159, 34.0692833],
            [-118.447066028, 34.06932181],
            [-118.446890878, 34.069249261],
            [-118.4470057, 34.0692017],
            [-118.447712807, 34.069494593],
          ],
        ],
      ],
    },
  },
  q3nOVG4EwCQCVZh5WQ7THVJomx32: {
    area: 7.628875999931366e-10,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-118.446787143, 34.071391135],
          [-118.446809627, 34.071381822],
          [-118.446850584, 34.071398787],
          [-118.446848327, 34.071399722],
          [-118.446847771, 34.071399952],
          [-118.446847225, 34.071400178],
          [-118.446840996, 34.071402758],
          [-118.4468281, 34.0714081],
          [-118.446808815, 34.071400112],
          [-118.446787143, 34.071391135],
        ],
      ],
    },
  },
};
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 34.0705513;
const LONGITUDE = -118.4468746;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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

  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const GROUP = "welsar-friends";
  const [geostate, setGeostate] = useState(SAMPLE_DATA);

  useEffect(() => {
    fetch("http://172.190.74.123:8000/get_group_geom/" + GROUP).then(
      (response) => {
        response.json().then((data) => {
          //   iterate through every object in data
          console.log("update geostate in overlay", geostate);
          setGeostate(data);
        });
      }
    );
  }, []);

  const shittemplate = (shit) => ({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: shit.geometry,
      },
    ],
  });
  // apply shoelace formula on template geometry

  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const usersRef = firebase.firestore().collection("users");
  const userQuery = usersRef.where("authId", "==", uid);
  const [color, setColor] = useState("White");

  const [users, setUsers] = useState({});

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const usersList = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          usersList[doc.id] = doc.data();
        });
        setUsers(usersList);
        console.log(usersList);
      });
  }, []);

  const polygons =
    geostate &&
    Object.entries(geostate)
      .filter(([user, geometry]) => geometry.geometry)
      .map(([user, geometry]) => {
        const userObj = users[user];
        //const fillColor = userObj ? userObj.color : "green";

        // console.log("userObj", user, userObj, userObj ? userObj.color : "#228B22", (userObj ? userObj.color : "#228B22") + "80");
        return (
          <Geojson
            key={user}
            strokeColor={userObj ? userObj.color : "#228B22"}
            fillColor={(userObj ? userObj.color : "#228B22") + "80"}
            strokeWidth={2}
            geojson={shittemplate(geometry)}
          />
        );
      });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
      >
        {polygons}
      </MapView>
    </View>
  );
};

export default Map;
