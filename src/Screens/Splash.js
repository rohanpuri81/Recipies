import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem("loggedUser")
        .then((res) => {
          return JSON.parse(res);
        })
        .then((res) => {
          if (Array.isArray(res) && res[0].name) {
            navigation.navigate("Home");
          } else {
            navigation.navigate("Splash2");
          }
        });
    }, 3000);
  }, []);
  return (
    <View style={style.open}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#007C00"
        translucent={true}
      />
      <Image style={style.Img} source={require("../Images/playstore.png")} />
      <ActivityIndicator size={"large"} />
      <Pressable
        onPress={() => {
          AsyncStorage.getItem("loggedUser")
            .then((res) => {
              return JSON.parse(res);
            })
            .then((res) => {
              if (Array.isArray(res) && res[0].name) {
                navigation.navigate("Home");
              } else {
                navigation.navigate("Splash2");
              }
            });
        }}
      >
        <Text style={style.txt}>START</Text>
      </Pressable>
    </View>
  );
};

export default Splash;

const style = StyleSheet.create({
  open: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Img: {
    width: 200,
    height: 200,
    marginBottom: 120,
  },
  txt: {
    fontSize: 30,
    marginTop: 80,
    backgroundColor: "green",
    color: "white",
    padding: 12,
    borderRadius: 5,
  },
});
