import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { VStack, Text, HStack, ScrollView, Box } from "native-base";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

import {
  CircleWavyCheck,
  Hourglass,
  Wrench,
  ClipboardText,
} from "phosphor-react-native";

import { Header } from "../../components/Header";
import { OrderProps } from "../../components/Order";
import { Loading } from "../../components/Loading";
import { CardDetails } from "../../components/CardDetails";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { OrderFirestoreDTO } from "../../DTOs/OrderDTO";
import { dateFormat } from "../../utils/firestoreDateFormat";
import { app, firestore } from "../../../firebase.config";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState("");
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  const navigation = useNavigation();

  async function handleOrderClose() {
    if (!solution) {
      return Alert.alert(
        "Alerta",
        "Por favor, informe a solução para concluir a ordem."
      );
    }
    console.log("init")

    try {
        console.log("try")

      const docRef = await addDoc(collection(firestore, "orders"), {
        status: "closed",
        solution,
        closedAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      Alert.alert("Successo", "Ordem concluída.");
      navigation.goBack();
    } catch (e) {
        console.log("catch")

      console.log("Error adding document: ", e);
      Alert.alert("Alerta", "Não foi possível concluir a ordem, tente novamente.");
    } finally{
        setIsLoading(false)
    }
  }

  async function fecthData() {
    setIsLoading(true);
    await getDocs(collection(firestore, "orders"))
      .then((querySnapshot) => {
        console.log("then")

        querySnapshot.docs.map((doc) => {
          const { plate, description, status, createdAt, closedAt, solution } =
            doc.data();
          const closed = closedAt ? dateFormat(closedAt) : null;

          setOrder({
            id: doc.id,
            plate,
            description,
            status,
            solution,
            when: dateFormat(createdAt),
            closed,
          });
        });
      })
      .catch((error) => {

        console.log("error", error);
      })
      .finally(() => {
        console.log("finally")

        setIsLoading(false);
      });
  }

  useEffect(() => {
    fecthData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="trueGray.50">
      <Box px={6}>
        <Header title="Detalhes da ordem" />
      </Box>
      <HStack bg="gray.100" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color="#166534" />
        ) : (
          <Hourglass size={22} color="#f97316" />
        )}

        <Text
          fontSize="sm"
          color={order.status === "closed" ? "#166534" : "#f97316"}
          ml={2}
          textTransform="uppercase"
        >
          {order.status === "closed" ? "Finished" : "in progress"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Título"
          description={order.plate}
          icon={Wrench}
        />

        <CardDetails
          title="Detalhes do problema"
          description={order.description}
          icon={ClipboardText}
          footer={`Registered on ${order.when}`}
        />

        <CardDetails
          title="Solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Completed on ${order.closed}`}
        >
          {order.status === "open" && (
            <Input
              placeholder="Detalhes da solução"
              onChangeText={setSolution}
              h={24}
              textAlignVertical="top"
              multiline
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status === "open" && (
        <Button title="Concluir ordem" m={5} onPress={handleOrderClose} />
      )}
    </VStack>
  );
}
