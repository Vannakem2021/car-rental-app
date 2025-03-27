import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

// Placeholder car image
const carImage =
  "https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=1974&auto=format&fit=crop";

// Brand logos
const brands = [
  {
    id: "1",
    name: "BMW",
    logo: "https://www.carlogos.org/car-logos/bmw-logo-2020-blue-white-show.png",
  },
  {
    id: "2",
    name: "Audi",
    logo: "https://www.carlogos.org/logo/Audi-logo-2016-1920x1080.png",
  },
  {
    id: "3",
    name: "Lexus",
    logo: "https://www.carlogos.org/car-logos/lexus-logo-2020-show.png",
  },
  {
    id: "4",
    name: "Tesla",
    logo: "https://www.carlogos.org/car-logos/tesla-logo-2007.png",
  },
  {
    id: "5",
    name: "Honda",
    logo: "https://www.carlogos.org/car-logos/honda-logo-2000-full-show.png",
  },
];

// Popular cars
export const popularCars = [
  {
    id: "1",
    brand: "Audi",
    model: "Q7 50 Quattro",
    image:
      "https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=1974&auto=format&fit=crop",
    rating: 4.5,
    fuel: "90L",
    transmission: "Manual",
    capacity: "6 People",
    price: 88,
    favorite: false,
  },
  {
    id: "2",
    brand: "Toyota",
    model: "Land Cruiser",
    image:
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=2039&auto=format&fit=crop",
    rating: 4.7,
    fuel: "80L",
    transmission: "Automatic",
    capacity: "7 People",
    price: 120,
    favorite: false,
  },
  {
    id: "3",
    brand: "BMW",
    model: "X5 xDrive",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2564&auto=format&fit=crop",
    rating: 4.6,
    fuel: "85L",
    transmission: "Automatic",
    capacity: "5 People",
    price: 95,
    favorite: true,
  },
  {
    id: "4",
    brand: "Mercedes",
    model: "GLC 300",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2940&auto=format&fit=crop",
    rating: 4.8,
    fuel: "70L",
    transmission: "Automatic",
    capacity: "5 People",
    price: 110,
    favorite: false,
  },
  {
    id: "5",
    brand: "Tesla",
    model: "Model Y",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2940&auto=format&fit=crop",
    rating: 4.9,
    fuel: "Electric",
    transmission: "Automatic",
    capacity: "5 People",
    price: 130,
    favorite: false,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Location Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={20} color="#F05A22" />
            <Text style={styles.locationText}>New York, USA</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search car..."
              placeholderTextColor="#888"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Top Brands */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Top Brands</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={brands}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.brandItem}>
                <View style={styles.brandLogoContainer}>
                  <Image source={{ uri: item.logo }} style={styles.brandLogo} />
                </View>
                <Text style={styles.brandName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Popular Cars */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Car</Text>
            <TouchableOpacity onPress={() => router.push("/popular-cars")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popularCars}
            keyExtractor={(item) => item.id}
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
                    <Text style={styles.carDetailText}>
                      {item.transmission}
                    </Text>
                  </View>
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
                    <Text style={styles.rentalButtonText}>Rental Now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
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
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: "#F05A22",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllText: {
    fontSize: 14,
    color: "#F05A22",
  },
  brandItem: {
    alignItems: "center",
    marginRight: 20,
    marginTop: 10,
  },
  brandLogoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  brandLogo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  brandName: {
    fontSize: 12,
  },
  carCard: {
    width: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
  },
  carImageContainer: {
    position: "relative",
  },
  carImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  carInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  carTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 3,
  },
  carDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  carDetailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  carDetailText: {
    fontSize: 12,
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
    fontSize: 18,
    fontWeight: "bold",
  },
  dayText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  rentalButton: {
    backgroundColor: "#F05A22",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  rentalButtonText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});
