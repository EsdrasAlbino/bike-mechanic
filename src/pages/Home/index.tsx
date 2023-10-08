import { useNavigation } from "@react-navigation/native";
import {
  Center,
  FlatList,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
} from "native-base";
import { ChatTeardropText, SignOut } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import { Alert } from "react-native";

import { dateFormat } from "../../utils/firestoreDateFormat";

import Logo from "../../assets/logo_secondary.svg";

import { app, firestore } from "../../../firebase.config";
import { Button } from "../../components/Button";
import { Filter } from "../../components/Filter";
import { Loading } from "../../components/Loading";
import { Order, OrderProps } from "../../components/Order";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate("New");
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("Details", { orderId });
  }

  function handleLogout() {
    /*         auth()
            .signOut()
            .catch(error => {
                console.log(error);
                return Alert.alert('Logout', 'Failed to log out')
            }); */
  }
  async function fecthData() {
    setIsLoading(true);
    const colectionRef = collection(firestore, "orders");
    const querySnapshot = query(
      colectionRef,
      where("status", "==", statusSelected)
    );

    await getDocs(querySnapshot)
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const { plate, description, status, createdAt } = doc.data();
          return {
            id: doc.id,
            plate,
            description,
            status,
            when: dateFormat(createdAt),
          };
        });
        setOrders(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    fecthData();
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg="trueGray.50">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="trueGray.200"
        pt={12}
        pb={5}
        px={6}
      >
        {/*                 <Logo />
         */}
        <IconButton
          icon={<SignOut size={26} color="#ea580c" />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="dark">Minhas ordens</Heading>
          <Text color="gray.500">{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="Em progresso"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />

          <Filter
            type="closed"
            title="Concluído"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <Order data={item} onPress={() => handleOpenDetails(item.id)} />
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color="#d4d4d8" size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você não possui{"\n"}
                  ordens{" "}
                  {statusSelected === "open" ? "in progress." : "finished."}
                </Text>
              </Center>
            )}
          />
        )}

        <Button title="Nova ordem" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
