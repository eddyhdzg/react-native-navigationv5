import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity, Text, Button } from "react-native";
import Center from "./Center";
import { HomeStackNavProps, HomeParamList } from "./HomeParamList";
import {
  TypedNavigator,
  StackNavigationState,
  RouteProp,
} from "@react-navigation/native";
import { SearchParamList, SearchStackNavProps } from "./SearchParamList";

const Product: React.FC<HomeStackNavProps<"Product">> = ({
  route,
  navigation,
}) => {
  return (
    <Center>
      <Text>{route.params.name}</Text>
      <Button
        title="Edit this product"
        onPress={() =>
          navigation.navigate("EditProduct", {
            name: route.params.name,
          })
        }
      >
        Edit this product
      </Button>
    </Center>
  );
};

function apiCall(x: any) {
  return x;
}

const EditProduct: React.FC<HomeStackNavProps<"EditProduct">> = ({
  route,
  navigation,
}) => {
  const [formState] = useState();
  const submit = useRef(() => {});
  submit.current = () => {
    // api call with new form state
    apiCall(formState);
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setParams({ submit });
  }, []);
  return (
    <Center>
      <Text>{route.params.name}</Text>
    </Center>
  );
};

export const addProductRoutes = (
  Stack: TypedNavigator<
    HomeParamList | SearchParamList,
    StackNavigationState,
    any,
    any,
    any
  >
) => {
  return (
    <>
      <Stack.Screen
        name="Product"
        component={Product}
        options={({
          route,
        }: {
          route: RouteProp<SearchParamList, "Product">;
        }) => ({
          headerTitle: `Product: ${route?.params?.name}`,
        })}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={({
          route,
        }: {
          route: RouteProp<SearchParamList, "EditProduct">;
        }) => ({
          headerTitle: `Edit: ${route?.params?.name}`,
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 8 }}
              onPress={() => {
                route.params.submit?.current();
              }}
            >
              <Text
                style={{
                  color: "red",
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
    </>
  );
};
