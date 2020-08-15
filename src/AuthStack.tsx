import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList, AuthNavProps } from "./AuthParamList";
import { AuthContext } from "./AuthProvider";
import Center from "./Center";
import { Button, Text } from "react-native";

const Stack = createStackNavigator<AuthParamList>();

const Login: React.FC<AuthNavProps<"Login">> = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  return (
    <Center>
      <Text>I am a login screen</Text>
      <Button
        title="log me in"
        onPress={() => {
          login();
        }}
      ></Button>
      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      ></Button>
    </Center>
  );
};

const Register: React.FC<AuthNavProps<"Register">> = ({
  navigation,
  route,
}) => {
  return (
    <Center>
      <Text>route name: {route.name}</Text>
      <Button
        title="go to login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      ></Button>
    </Center>
  );
};

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;
