import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Card = ({ index, items }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        AsyncStorage.getItem("loggedUser").then((p) => {
          let k = JSON.parse(p);
          if (Array.isArray(k) && k[0].name) {
            navigation.navigate("RecipeDetails", { items });
          } else {
            navigation.navigate("Login");
          }
        });
      }}
    >
      <View style={style.main}>
        <Image style={style.img} source={{ uri: items.strMealThumb }} />
        <Text style={style.txt}>
          {items.strMeal.length >= 20
            ? items.strMeal.slice(0, 15)
            : items.strMeal}
        </Text>
      </View>
    </Pressable>
  );
};

export default Card;

const style = StyleSheet.create({
  main: {
    margin: 14,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 7,
  },
  txt: {
    alignSelf: "center",
  },
});
