import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React from "react";
import Card from "./Card";
import { useNavigation } from "@react-navigation/native";

const Recipies = ({ meals }) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Found {meals.length} Recipes</Text>
      <View>
        {meals.length == 0 ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <FlatList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            renderItem={({ item, i }) => <Card items={item} index={i} />}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};

export default Recipies;

const style = StyleSheet.create({
  main: {
    marginHorizontal: 16,
  },
});
