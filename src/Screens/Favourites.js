import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Recipies from "../components/Recipies";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Favourites = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const getData = async () => {
    AsyncStorage.getItem("users")
      .then((res) => {
        return JSON.parse(res);
      })
      .then((resM) => {
        AsyncStorage.getItem("loggedUser")
          .then((ele) => {
            return JSON.parse(ele);
          })
          .then((res) => {
            let d = resM.filter((ele) => {
              return ele.email == res[0].email;
            });
            setData(d[0].cart);
          });
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={style.main}>
      <View style={style.topNav}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Image style={style.sImg} source={require("../Images/arrow.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            getData();
          }}
        >
          <Image style={style.sImg} source={require("../Images/refresh.png")} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
        <Recipies meals={data} />
      </View>
    </View>
  );
};

export default Favourites;

const style = StyleSheet.create({
  topNav: {
    width: "100%",
    backgroundColor: "lightblue",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 13,
  },
  sImg: {
    height: 34,
    width: 34,
  },
  main: {
    width: "100%",
    paddingTop: 35,
  },
});
