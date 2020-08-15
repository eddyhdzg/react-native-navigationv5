import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { ActivityIndicator, AsyncStorage } from "react-native";
import Center from "./Center";
import { AuthContext } from "./AuthProvider";
import AppTabs from "./AppTabs";
import AuthStack from "./AuthStack";

const Routes: React.FC = ({}) => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((userString) => {
        if (userString) {
          login();
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }
  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
