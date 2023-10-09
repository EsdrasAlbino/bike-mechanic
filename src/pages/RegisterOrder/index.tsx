import { useState } from "react";
import { Alert } from "react-native";
import { VStack } from "native-base";
//import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { firestore } from "../../../firebase.config";

export function RegisterOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [plate, setPlate] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  async function handleNewOrderRegister() {
    if (!plate || !description) {
      return Alert.alert(
        "Alerrta",
        "Por favor, preencha o título e a descrição."
      );
    }

    setIsLoading(true);

    try {
      const docRef = await addDoc(collection(firestore, "orders"), {
        plate,
        description,
        status: "open",
        createdAt: serverTimestamp(),
      })
      console.log("Document written with ID: ", docRef.id);
      Alert.alert("Successo", "Ordem registrada.");
      navigation.goBack();
    } catch (e) {
      console.log("Error adding document: ", e);
      Alert.alert("Alerta", "Não foi possível registrar a ordem.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} p={6} bg="trueGray.50">
      <Header title="Nova Ordem" />

      <Input placeholder="Título" mt={4} onChangeText={setPlate} />

      <Input
        placeholder="Descrição do problema"
        mt={5}
        flex={1}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button
        title="Registrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}
