import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

// Import the popular cars data from home screen
import { popularCars } from "./(tabs)/index";

export default function PopularCarsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Popular Cars</Text>
      </View>

      {/* Cars Grid */}
      <FlatList
        data={popularCars}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.carsContainer}
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
            <View style={styles.carImageContainer}>
              <Image source={{ uri: item.image }} style={styles.carImage} />
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={(e) => {
                  e.stopPropagation();
                  // Handle favorite toggle logic here
                }}
              >
                <Ionicons
                  name="heart"
                  size={20}
                  color={item.favorite ? "#F05A22" : "#FF0000"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.carInfo}>
              <Text style={styles.carTitle}>
                {item.brand} {item.model}
              </Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Ionicons name="star" size={14} color="#FFD700" />
              </View>
            </View>
            <View style={styles.carDetails}>
              <View style={styles.carDetailItem}>
                <Ionicons name="car-outline" size={16} color="#888" />
                <Text style={styles.carDetailText}>{item.fuel}</Text>
              </View>
              <View style={styles.carDetailItem}>
                <MaterialIcons name="settings" size={16} color="#888" />
                <Text style={styles.carDetailText}>{item.transmission}</Text>
              </View>
            </View>
            <View style={styles.carDetailsRow}>
              <View style={styles.carDetailItem}>
                <Ionicons name="people" size={16} color="#888" />
                <Text style={styles.carDetailText}>{item.capacity}</Text>
              </View>
            </View>
            <View style={styles.priceRow}>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>${item.price}</Text>
                <Text style={styles.dayText}>/day</Text>
              </View>
              <TouchableOpacity style={styles.rentalButton}>
                <Text style={styles.rentalButtonText}>Rent</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  carsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  carCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
    maxWidth: "46%",
  },
  carImageContainer: {
    position: "relative",
  },
  carImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  carInfo: {
    marginTop: 8,
  },
  carTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 3,
  },
  carDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  carDetailsRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  carDetailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  carDetailText: {
    fontSize: 11,
    color: "#888",
    marginLeft: 3,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dayText: {
    fontSize: 11,
    color: "#888",
    marginBottom: 1,
  },
  rentalButton: {
    backgroundColor: "#F05A22",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  rentalButtonText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "bold",
  },
});
