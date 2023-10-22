import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecipeDetails = (props) => {
  const navigation = useNavigation();
  const [ing, setIng] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [ins, setIns] = useState("p");
  useEffect(() => {
    let data;
    let indexes = [];
    let index = [];
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${items.idMeal}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        data = res.meals[0];
        for (let i = 1; i < 20; i++) {
          if (data[`strIngredient${i}`] != "") {
            indexes.push(data[`strIngredient${i}`]);
          }
          if (data[`strMeasure${i}`]) {
            index.push(data[`strMeasure${i}`]);
          }
        }
        setIng(indexes);
        setMeasures(index);
        setIns(data.strInstructions);
      });
  }, []);
  const { items } = props.route.params;
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
            AsyncStorage.getItem("users")
              .then((res) => {
                return JSON.parse(res);
              })
              .then((resMain) => {
                AsyncStorage.getItem("loggedUser")
                  .then((res) => {
                    return JSON.parse(res);
                  })
                  .then((resUser) => {
                    let newArr = resMain.filter((ele, i) => {
                      if (ele.email == resUser[0].email) {
                        let cartInc = ele.cart.filter(
                          (ele) => ele.idMeal == items.idMeal
                        );
                        if (cartInc.length == 0) {
                          ele.cart.push(items);
                          return ele;
                        } else {
                          return ele;
                        }
                      } else {
                        return ele;
                      }
                    });
                    AsyncStorage.setItem("users", JSON.stringify(newArr));
                  })
                  .catch((err) => console.log(err));
              });
          }}
        >
          <Image
            style={style.sImg}
            source={require("../Images/bookmark.png")}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Image style={style.img} source={{ uri: items.strMealThumb }} />
        <Text style={style.heading}>{items.strMeal}</Text>

        <View style={style.innerView}>
          <Text style={style.h2}>Ingredients</Text>
          {ing.map((ele, ind) => {
            return (
              <Text key={ind + ele} style={{ marginLeft: 12 }}>
                😋 {ele}
              </Text>
            );
          })}
        </View>
        <View style={style.innerView}>
          <Text style={style.h2}>Measures</Text>
          {measures.map((ele, ind) => {
            return (
              <Text key={ind + ele} style={{ marginLeft: 12 }}>
                😋 {ele}
              </Text>
            );
          })}
        </View>
        <View style={style.lastView}>
          <Text style={style.h2}>Instructions</Text>
          <Text style={{ marginLeft: 12 }}>{ins}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default RecipeDetails;

const style = StyleSheet.create({
  main: {
    width: "100%",
    paddingTop: 35,
  },
  img: {
    width: "100%",
    height: 300,
  },
  sImg: {
    height: 34,
    width: 34,
  },
  topNav: {
    width: "100%",
    backgroundColor: "lightblue",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 13,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
    alignSelf: "center",
  },
  h2: {
    fontSize: 24,
    fontWeight: "700",
  },
  innerView: {
    marginTop: 20,
    width: "100%",
    paddingLeft: 40,
  },
  lastView: {
    marginTop: 20,
    width: "100%",
    paddingLeft: 40,
    marginBottom: 70,
  },
});
