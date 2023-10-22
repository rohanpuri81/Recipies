import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { filtersData } from "./FiltersData";

const Filters = ({ filters, currFilter, handleChangeFilter }) => {
  return (
    <View>
      <Text style={style.txt}>Filters</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          paddingHorizontal: 1,
        }}
      >
        {filtersData?.map((filter, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => handleChangeFilter(filter.strCategory)}
            >
              <Image
                style={style.img}
                source={{ uri: filter.strCategoryThumb }}
              />
              <Text style={{ alignSelf: "center", marginTop: 4 }}>
                {filter.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Filters;

const style = StyleSheet.create({
  main: {
    flexDirection: "column",
  },
  img: {
    width: 60,
    height: 50,
    marginHorizontal: 10,
  },
  txt: {
    fontSize: 15,
    fontWeight: "600",
  },
});
