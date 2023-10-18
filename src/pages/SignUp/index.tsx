import { useContext, useState } from "react";
import { Alert } from "react-native";

import { Heading, Icon, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import  { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { AuthContext } from "../../context/AuthContext";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(AuthContext);

   const createProfile = async (response: FirebaseAuthTypes.UserCredential) => {
    const userId = response.user.uid;
    const user = {
      email: response.user.email,
      id: userId,
    };

    await firestore().collection("users").doc(userId).set(user);

    //setUserData(response);
  };

  async function handleSignUp() {
    if (!email || !password) {
      return Alert.alert("Alerta", "Digite o email e a password");
    }
    setIsLoading(true);
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      await createProfile(response);
    } catch (error) {
      console.log(error);

      if (error.code === "auth/invalid-email") {
        return Alert.alert("Alerta", "Email inválido.");
      }

      if (error.code === "auth/wrong-password") {
        return Alert.alert("Alerta", "Email e senha inválidos.");
      }

      if (error.code === "auth/user-not-found") {
        return Alert.alert("Alerta", "Usuário não registrado.");
      }

      return Alert.alert("Alerta", "Não foi possível acessar o aplicativo.");
    } finally {
      setIsLoading(false);
    }
  } 

  return (
    <VStack flex={1} alignItems="center" bg="trueGray.50" px={8} pt={24}>
      {/* <Logo style={{ width: 10, height: 10 }} /> */}

      <Heading color="trueGray.900" fontSize="xl" mt={20} mb={6}>
        Crie sua conta
      </Heading>

      <Input
        placeholder="Email"
        InputLeftElement={<Icon as={<Envelope color="#a1a1aa" />} ml={4} />}
        onChangeText={setEmail}
        mb={5}
      />

      <Input
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color="#a1a1aa" />} ml={4} />}
        secureTextEntry={true}
        onChangeText={setPassword}
        mb={8}
      />

      <Button
        title="Registrar"
        w="full"
        onPress={handleSignUp}
        isLoading={isLoading}
      />
    </VStack>
  );
}
