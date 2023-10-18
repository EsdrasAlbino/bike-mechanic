import { useState } from "react";
import { Alert } from "react-native";
import { VStack } from "native-base";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function RegisterOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [plate, setPlate] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if(!plate || !description) {
        return Alert.alert('Warning', 'Please provide a plate and description.')
    }

    setIsLoading(true);

    firestore()
    .collection('orders')
    .add({
        plate,
        description,
        status: 'open',
        createdAt: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        Alert.alert('Success', 'Order has been created.')
        navigation.goBack();
    })
    .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert('Warning', 'Unable to create order, try again later.')
    })
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
