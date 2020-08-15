import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchParamList, SearchStackNavProps } from "./SearchParamList";
import { Text, Button, FlatList } from "react-native";
import Center from "./Center";
import faker from "faker";
import { addProductRoutes } from "./addProductRoutes";

const Stack = createStackNavigator<SearchParamList>();

const Search: React.FC<SearchStackNavProps<"Search">> = ({ navigation }) => {
  const [show, setShow] = useState(false);
  return (
    <Center>
      <Button
        title="Search Products"
        onPress={() => {
          setShow(true);
        }}
      />
      {show && (
        <FlatList
          style={{ width: "100%" }}
          renderItem={({ item }) => {
            return (
              <Button
                title={item}
                onPress={() => {
                  navigation.navigate("Product", {
                    name: item,
                  });
                }}
              />
            );
          }}
          keyExtractor={(product, idx) => product + idx}
          data={Array.from(Array(50), () => faker.commerce.product())}
        />
      )}
    </Center>
  );
};

const SearchStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={Search} />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};

export default SearchStack;
