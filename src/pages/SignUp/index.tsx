import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { Alert } from "react-native";

import { Heading, Icon, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../../firebase.config";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { AuthContext } from "../../context/AuthContext";

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(AuthContext);




  async function handleSignUp() {
    if (!email || !password) {
      return Alert.alert("Alerta", "Digite o email e a password");
    }
    setIsLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        setUserData(user);
        const uid = user.user.uid;
        const dataUser = {
          id: uid,
          email,
        };
        const usersRef = doc(firestore, "users", uid);
        await setDoc(usersRef, dataUser);
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
