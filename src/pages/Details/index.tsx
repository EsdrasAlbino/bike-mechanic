import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { VStack, Text, HStack, ScrollView, Box } from "native-base";
import firestore from "@react-native-firebase/firestore"


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
  const [solution, setSolution] = useState('');
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  const navigation = useNavigation();

  function handleOrderClose() {
      if(!solution) {
          return Alert.alert('Warning', 'Please informe the solution to close the order.')
      }

      firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
          status: 'closed',
          solution,
          closedAt: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
          Alert.alert('Success', 'Order has been closed.')
          navigation.goBack();
      })
      .catch((error) => {
          console.log(error);
          Alert.alert('Warning', 'Could not close order, try again.');
      });
  }

  useEffect(() => {
      firestore()
          .collection<OrderFirestoreDTO>('orders')
          .doc(orderId)
          .get()
          .then(doc => {
              const { plate, description, status, createdAt, closedAt, solution } = doc.data();

              const closed = closedAt ? dateFormat(closedAt) : null;

              setOrder({
                  id: doc.id,
                  plate,
                  description,
                  status,
                  solution,
                  when: dateFormat(createdAt),
                  closed,
              })
              setIsLoading(false);
          })
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
        <CardDetails title="Título" description={order.plate} icon={Wrench} />

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
        <Button title="Concluir ordem" m={5} 
        onPress={handleOrderClose} 
        />
      )}
    </VStack>
  );
}
