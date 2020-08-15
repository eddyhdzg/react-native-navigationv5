import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Center from "./Center";
import { Text, TouchableOpacity, FlatList, Button } from "react-native";
import { HomeParamList, HomeStackNavProps } from "./HomeParamList";
import faker from "faker";
import { AuthContext } from "./AuthProvider";
import { addProductRoutes } from "./addProductRoutes";

const Feed: React.FC<HomeStackNavProps<"Feed">> = ({ navigation }) => {
  return (
    <Center>
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
    </Center>
  );
};

const Stack = createStackNavigator<HomeParamList>();
const HomeStack: React.FC = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => logout()}>
                <Text>Logout</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};

export default HomeStack;
