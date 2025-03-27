import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Sample car categories
const categories = [
  {
    id: "1",
    name: "SUV",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    count: 120,
  },
  {
    id: "2",
    name: "Sedan",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc7294bdf7?q=80&w=2071&auto=format&fit=crop",
    count: 240,
  },
  {
    id: "3",
    name: "Pickup",
    image:
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=2070&auto=format&fit=crop",
    count: 90,
  },
  {
    id: "4",
    name: "Electric",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
    count: 55,
  },
  {
    id: "5",
    name: "Luxury",
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=2037&auto=format&fit=crop",
    count: 75,
  },
  {
    id: "6",
    name: "Convertible",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
    count: 45,
  },
];

// Define a type for car
type Car = {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
};

// Cars by category with proper typing
export const carsByCategory: Record<string, Car[]> = {
  SUV: [
    {
      id: "suv1",
      name: "Toyota RAV4",
      image:
        "https://images.unsplash.com/photo-1581540222194-0def2d54b8b0?q=80&w=2067&auto=format&fit=crop",
      price: 75,
      rating: 4.6,
    },
    {
      id: "suv2",
      name: "Honda CR-V",
      image:
        "https://images.unsplash.com/photo-1568844293986-ca3c586cb899?q=80&w=2080&auto=format&fit=crop",
      price: 70,
      rating: 4.4,
    },
    {
      id: "suv3",
      name: "Ford Explorer",
      image:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
      price: 85,
      rating: 4.3,
    },
    {
      id: "suv4",
      name: "Jeep Wrangler",
      image:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop",
      price: 90,
      rating: 4.7,
    },
  ],
  Sedan: [
    {
      id: "sedan1",
      name: "Toyota Camry",
      image:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2074&auto=format&fit=crop",
      price: 65,
      rating: 4.5,
    },
    {
      id: "sedan2",
      name: "Honda Accord",
      image:
        "https://images.unsplash.com/photo-1590510429106-a9642c9ea048?q=80&w=2070&auto=format&fit=crop",
      price: 68,
      rating: 4.6,
    },
    {
      id: "sedan3",
      name: "BMW 3 Series",
      image:
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2564&auto=format&fit=crop",
      price: 95,
      rating: 4.8,
    },
    {
      id: "sedan4",
      name: "Mercedes C-Class",
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
      price: 98,
      rating: 4.7,
    },
  ],
  Pickup: [
    {
      id: "pickup1",
      name: "Ford F-150",
      image:
        "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=2070&auto=format&fit=crop",
      price: 92,
      rating: 4.5,
    },
    {
      id: "pickup2",
      name: "Chevrolet Silverado",
      image:
        "https://images.unsplash.com/photo-1609941232762-fd1def4a4518?q=80&w=2069&auto=format&fit=crop",
      price: 88,
      rating: 4.4,
    },
    {
      id: "pickup3",
      name: "RAM 1500",
      image:
        "https://images.unsplash.com/photo-1569274749888-942593f855cd?q=80&w=2080&auto=format&fit=crop",
      price: 95,
      rating: 4.6,
    },
    {
      id: "pickup4",
      name: "Toyota Tacoma",
      image:
        "https://images.unsplash.com/photo-1599256871679-6cd27fc7e180?q=80&w=1631&auto=format&fit=crop",
      price: 85,
      rating: 4.3,
    },
  ],
  Electric: [
    {
      id: "electric1",
      name: "Tesla Model 3",
      image:
        "https://images.unsplash.com/photo-1561580125-028ee3bd62eb?q=80&w=2070&auto=format&fit=crop",
      price: 110,
      rating: 4.9,
    },
    {
      id: "electric2",
      name: "Nissan Leaf",
      image:
        "https://images.unsplash.com/photo-1647491946387-b0a67be9c705?q=80&w=2070&auto=format&fit=crop",
      price: 75,
      rating: 4.3,
    },
    {
      id: "electric3",
      name: "Audi e-tron",
      image:
        "https://images.unsplash.com/photo-1607197109166-3ab70ce6acb8?q=80&w=2070&auto=format&fit=crop",
      price: 115,
      rating: 4.7,
    },
    {
      id: "electric4",
      name: "Porsche Taycan",
      image:
        "https://images.unsplash.com/photo-1611288937557-24ec69f49af7?q=80&w=2075&auto=format&fit=crop",
      price: 150,
      rating: 4.8,
    },
  ],
  Luxury: [
    {
      id: "luxury1",
      name: "Mercedes S-Class",
      image:
        "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?q=80&w=2070&auto=format&fit=crop",
      price: 200,
      rating: 4.9,
    },
    {
      id: "luxury2",
      name: "BMW 7 Series",
      image:
        "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2070&auto=format&fit=crop",
      price: 190,
      rating: 4.8,
    },
    {
      id: "luxury3",
      name: "Audi A8",
      image:
        "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop",
      price: 185,
      rating: 4.7,
    },
    {
      id: "luxury4",
      name: "Bentley Continental",
      image:
        "https://images.unsplash.com/photo-1566473965997-3de9c817e938?q=80&w=2070&auto=format&fit=crop",
      price: 350,
      rating: 5.0,
    },
  ],
  Convertible: [
    {
      id: "conv1",
      name: "BMW Z4",
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
      price: 120,
      rating: 4.7,
    },
    {
      id: "conv2",
      name: "Porsche 911 Cabriolet",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
      price: 180,
      rating: 4.9,
    },
    {
      id: "conv3",
      name: "Mercedes SL",
      image:
        "https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?q=80&w=2070&auto=format&fit=crop",
      price: 145,
      rating: 4.6,
    },
    {
      id: "conv4",
      name: "Mazda MX-5",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
      price: 90,
      rating: 4.5,
    },
  ],
};

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {selectedCategory ? (
        <View style={styles.categoryDetailContainer}>
          <View style={styles.categoryHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedCategory(null)}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.categoryHeaderTitle}>
              {selectedCategory} Cars
            </Text>
          </View>

          <FlatList
            data={carsByCategory[selectedCategory]}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.carCard}
                onPress={() =>
                  router.push({
                    pathname: "/car-details",
                    params: { id: item.id },
                  })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.carCardImage}
                />
                <View style={styles.carCardContent}>
                  <Text style={styles.carCardName}>{item.name}</Text>
                  <View style={styles.carCardDetails}>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceText}>${item.price}</Text>
                      <Text style={styles.dayText}>/day</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.rentButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push({
                        pathname: "/car-details",
                        params: { id: item.id },
                      });
                    }}
                  >
                    <Text style={styles.rentButtonText}>Rent Now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => setSelectedCategory(item.name)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.categoryImage}
                />
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryName}>{item.name}</Text>
                  <Text style={styles.categoryCount}>{item.count} Cars</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <Ionicons name="chevron-forward" size={24} color="#F05A22" />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  categoryCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  categoryContent: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  categoryCount: {
    fontSize: 14,
    color: "#888",
  },
  arrowContainer: {
    justifyContent: "center",
    paddingRight: 15,
  },
  categoryDetailContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  categoryHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  carCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  carCardImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  carCardContent: {
    padding: 15,
  },
  carCardName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  carCardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dayText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
    marginLeft: 2,
  },
  rentButton: {
    backgroundColor: "#F05A22",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  rentButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
