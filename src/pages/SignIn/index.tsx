import { signInWithEmailAndPassword } from "firebase/auth";

import { useContext, useState } from "react";
import { Alert } from "react-native";

import { Heading, Icon, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../../firebase.config";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { AuthContext } from "../../context/AuthContext";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(AuthContext);

  const navigation = useNavigation();

  const callRegisterScreen = () => {
    navigation.navigate("SignUp");
  };

  async function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("Alerta", "Digite o email e a password");
    }
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        const uid = user.user.uid;
        const usersRef = doc(firestore, "users", uid);
        const firestoreDocument = await getDoc(usersRef)
        if (!firestoreDocument.exists) {
          setIsLoading(false);
          Alert.alert("Alerta", "Usuário não registrado.");
          return;
        }
        setUserData(user);
      })
      .catch((error) => {
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <VStack flex={1} alignItems="center" bg="trueGray.50" px={8} pt={24}>
      {/* <Logo style={{ width: 10, height: 10 }} /> */}

      <Heading color="trueGray.900" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
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
        title="Login"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
      <Button
        title="Criar uma conta"
        w=""
        color={"orange.500"}
        backgroundColor={"white"}
        onPress={callRegisterScreen}
      />
    </VStack>
  );
}
