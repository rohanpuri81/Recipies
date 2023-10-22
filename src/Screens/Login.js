import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TxtInp from "../components/TxtInp";
import Btn from "../components/Btn";

const Login = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const check = () => {
    if (email !== "" && password !== "") {
      if (!email.includes("@") && !email.includes(".")) {
        Alert.alert("Enter Correct Email");
      } else if (password.length <= 6) {
        Alert.alert("Password length must be more than 6 digits");
      } else {
        getDate();
        setEmail("");
        setPassword("");
      }
    } else {
      Alert.alert("Enter All the details");
    }
  };

  const getDate = () => {
    AsyncStorage.getItem("users").then((p) => {
      let y = JSON.parse(p).filter((e) => {
        return e.email == email && e.password == password;
      });
      if (Array.isArray(y) && y.length == 1) {
        console.log(y);
        AsyncStorage.setItem("loggedUser", JSON.stringify(y))
          .then(() => {
            props.navigation.navigate("Home", { name: y[0].name });
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        value={email}
        backgroundColor="#007C00"
        translucent={true}
      />
      <Image style={style.Img} source={require("../Images/playstore.png")} />
      <Text style={style.txt}>Login</Text>
      <TxtInp
        placeholder="Enter Your Email"
        icon={require("../Images/email.png")}
        value={email}
        onchageText={(text) => {
          setEmail(text);
        }}
      />
      <TxtInp
        type={"password"}
        placeholder="Enter Your Password"
        icon={require("../Images/padlock.png")}
        value={password}
        onchageText={(text) => {
          setPassword(text);
        }}
      />

      <Btn
        color={"white"}
        bgColor={"#007C00"}
        title={"Login"}
        onPress={check}
      />
      <Text style={style.SignUp}>
        Dont have account?{" "}
        <TouchableOpacity
          style={style.register}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text> register</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default Login;

const style = StyleSheet.create({
  Img: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 100,
    borderRadius: 50,
  },
  txt: {
    marginTop: 32,
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
