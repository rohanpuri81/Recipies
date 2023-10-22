import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import TxtInp from "../components/TxtInp";
import Btn from "../components/Btn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const navigation = useNavigation();
  function log() {
    console.warn("loggedeIn");
  }
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cart: [],
  });

  const check = () => {
    let { email, name, password } = user;
    if (email !== "" && password !== "" && name !== "") {
      if (!email.includes("@") && !email.includes(".")) {
        Alert.alert("Enter Correct Email");
      } else if (password.length <= 6) {
        Alert.alert("Password length must be more than 6 digits");
      } else {
        validate = true;
        saveData();
        setUser({
          ...user,
          name: "",
          email: "",
          password: "",
        });
        navigation.navigate("Login");
      }
    } else {
      Alert.alert("Enter All the details");
    }
  };
  const [per, setPer] = useState("");
  const saveData = async () => {
    AsyncStorage.getItem("users").then((p) => {
      if (p == null) {
        AsyncStorage.setItem("users", JSON.stringify([user]));
      } else {
        let j = JSON.parse(p);
        AsyncStorage.setItem("users", JSON.stringify([...j, user]));
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#007C00"
        translucent={true}
      />
      <Image style={style.Img} source={require("../Images/playstore.png")} />
      <Text style={style.txt}>Sign Up</Text>
      <TxtInp
        placeholder="Enter Your Name"
        value={user.name}
        onchageText={(text) => {
          setUser({ ...user, name: text });
        }}
        icon={require("../Images/profile.png")}
      />
      <TxtInp
        placeholder="Enter Your Email"
        value={user.email}
        onchageText={(text) => {
          setUser({ ...user, email: text });
        }}
        icon={require("../Images/email.png")}
      />
      <TxtInp
        type={""}
        placeholder="Enter Your Password"
        value={user.password}
        onchageText={(text) => {
          setUser({ ...user, password: text });
        }}
        icon={require("../Images/padlock.png")}
      />

      <Btn
        color={"white"}
        bgColor={"#007C00"}
        title={"register"}
        onPress={check}
      />

      <Text style={style.SignUp}>
        Already have an account?{" "}
        <TouchableOpacity
          style={style.register}
          onPress={() => navigation.navigate("Login")}
        >
          <Text> login</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default SignUp;

const style = StyleSheet.create({
  Img: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginTop: 100,
    borderRadius: 50,
  },
  txt: {
    marginTop: 50,
    alignSelf: "center",
    fontSize: 26,
    letterSpacing: 3,
    color: "black",
  },
  SignUp: {
    fontSize: 17,
    fontWeight: "700",
    alignSelf: "center",
    marginTop: 17,
  },
  register: {
    marginTop: 120,
  },
});
