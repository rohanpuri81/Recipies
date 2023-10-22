import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Filters from "../components/Filters";
import Recipies from "../components/Recipies";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = (props) => {
  const [dinner, setDinner] = useState([]);
  const [filters, setFilters] = useState([]);
  const [currFilter, setCurrFilter] = useState("Vegetarian");
  const [name, setName] = useState("User");
  useEffect(() => {
    AsyncStorage.getItem("loggedUser").then((p) => {
      let user = JSON.parse(p);
      let n = user[0].name;
      setName(n);
    });
  }, []);

  const handleChangeFilter = (filter) => {
    getRecipies(filter);
    setCurrFilter(filter);
    setDinner([]);
  };
  useEffect(() => {
    getFilters();
    getRecipies();
  }, []);

  const getFilters = async () => {
    let d = fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    d.then((res) => {
      return res.json();
    })
      .then((res) => {
        if (res && res.categories) {
          setFilters(res.categories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRecipies = async (category = "Vegetarian") => {
    let d = fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    d.then((res) => {
      return res.json();
    })
      .then((res) => {
        if (res && res.meals) {
          setDinner(res.meals);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataByName = async (t = "p") => {
    let d = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${t}`);
    d.then((res) => {
      return res.json();
    })
      .then((res) => {
        if (res.meals != null) {
          setDinner(res.meals);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={style.main}>
      <View style={style.HeaderView}>
        <Text style={style.txt}>Hello, {name}</Text>
        <TouchableOpacity
          onPress={() => {
            let k = "k";
            AsyncStorage.setItem("loggedUser", JSON.stringify(k)).then(() => {
              props.navigation.navigate("Splash2");
            });
          }}
        >
          <Image style={style.img} source={require("../Images/logout.png")} />
        </TouchableOpacity>
      </View>

      <View style={style.searching}>
        <Image style={style.img} source={require("../Images/search.png")} />
        <TextInput
          onChangeText={(text) => {
            getDataByName(text);
          }}
          style={style.SearchInp}
        />
      </View>
      <View style={style.HeadingView}>
        <View style={style.logo}>
          <Text style={style.h1}>GoodFood</Text>
          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Favourites");
              }}
            >
              <Image
                style={style.logoImg}
                source={require("../Images/diskette.png")}
              />
            </TouchableOpacity>
            <Text
              style={{ fontWeight: "700", marginTop: 4, alignSelf: "center" }}
            >
              Saved
            </Text>
          </View>
        </View>
      </View>
      <View style={style.filters}>
        <Filters
          filters={filters}
          currFilter={currFilter}
          handleChangeFilter={handleChangeFilter}
        />
      </View>
      <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
        <Recipies meals={dinner} />
      </View>
    </View>
  );
};

export default Home;

const style = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#fff",
  },
  txt: {
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "700",
    color: "black",
  },
  HeaderView: {
    height: 70,
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  img: {
    height: 40,
    width: 40,
  },
  HeadingView: {
    paddingHorizontal: 20,
    marginTop: 14,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    paddingBottom: 10,
  },
  h2: {
    fontSize: 22,
  },
  h1: {
    fontSize: 40,
    fontWeight: "700",
  },
  logo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoImg: {
    height: 40,
    width: 40,
  },
  searching: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 16,
    flexDirection: "row-reverse",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderColor: "lightgrey",
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  SearchInp: {
    height: 30,
    width: "90%",
  },
  filters: {
    width: "100%",
    marginHorizontal: 10,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
