import { View, TextInput, StyleSheet, Image } from "react-native";
import React from "react";

const TxtInp = ({ value, onchageText, placeholder, icon, type }) => {
  return (
    <View style={style.txtInp}>
      <Image source={icon} style={style.icon} />
      <TextInput
        style={style.txt}
        value={value}
        placeholder={placeholder}
        secureTextEntry={type == "password" ? true : false}
        onChangeText={onchageText}
      />
    </View>
  );
};

export default TxtInp;

const style = StyleSheet.create({
  txtInp: {
    alignSelf: "center",
    height: 50,
    width: "85%",
    borderRadius: 10,
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 0.5,
    marginTop: 25,
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  txt: {
    marginLeft: 20,
  },
});
