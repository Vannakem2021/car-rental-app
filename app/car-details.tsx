import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { popularCars } from "./(tabs)/index";
import { carsByCategory } from "./(tabs)/explore";

// Define types for cars
type PopularCar = {
  id: string;
  brand: string;
  model: string;
  image: string;
  rating: number;
  fuel: string;
  transmission: string;
  capacity: string;
  price: number;
  favorite: boolean;
};

type CategoryCar = {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
};

// Define the review type
type Review = {
  id: string;
  name: string;
  role: string;
  date: string;
  text: string;
  rating: number;
  avatar: string;
};

export default function CarDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const carId = params.id as string;

  // Find the car from the popularCars array first
  let car = popularCars.find((c) => c.id === carId);

  // If not found in popularCars, try to find in carsByCategory
  if (!car) {
    // Search in all categories
    for (const category in carsByCategory) {
      const categoryCarList = carsByCategory[category];
      const foundCar = categoryCarList.find((c: CategoryCar) => c.id === carId);
      if (foundCar) {
        // Create a compatible car object
        car = {
          id: foundCar.id,
          brand: "", // Use the name as both brand and model if from category
          model: foundCar.name,
          image: foundCar.image,
          rating: foundCar.rating,
          fuel: "Varies", // Default values for category cars
          transmission: "Automatic",
          capacity: "5 People",
          price: foundCar.price,
          favorite: false,
        };
        break;
      }
    }
  }

  // If still not found, use the first popular car as fallback
  if (!car) {
    car = popularCars[0];
  }

  const [activeTab, setActiveTab] = useState("About");
  const [isFavorite, setIsFavorite] = useState(car.favorite || false);

  // Sample reviews data
  const reviews: Review[] = [
    {
      id: "1",
      name: "Max Halvart",
      role: "CEO at Car Station",
      date: "09 March 2025",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has.",
      rating: 4.5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "2",
      name: "Tom Andy",
      role: "CEO at Car Station",
      date: "14 March 2025",
      text: "Lorem Ipsum is simply dummy text of the printing.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header with back button and favorite button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Car Details</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Ionicons
            name="heart"
            size={24}
            color={isFavorite ? "#FF0000" : "#FFF"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Car Image with 360 indicator */}
        <View style={styles.carImageContainer}>
          <Image
            source={{ uri: car.image }}
            style={styles.carImage}
            resizeMode="contain"
          />
          <View style={styles.indicator360Container}>
            <Text style={styles.indicator360Text}>360</Text>
          </View>
        </View>

        {/* Car Info */}
        <View style={styles.carInfoContainer}>
          <View style={styles.carTitleContainer}>
            <Text style={styles.carTitle}>
              {car.brand} {car.model}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{car.rating}</Text>
              <Ionicons name="star" size={16} color="#FFD700" />
            </View>
          </View>
          <Text style={styles.brandText}>{car.brand}</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {["About", "Gallery", "Review"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.activeTabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Content based on active tab */}
        {activeTab === "About" && (
          <View style={styles.tabContent}>
            {/* Rent Partner */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Rent Partner</Text>
              <View style={styles.ownerContainer}>
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/women/44.jpg",
                  }}
                  style={styles.ownerImage}
                />
                <View style={styles.ownerInfo}>
                  <Text style={styles.ownerName}>Jenny Doe</Text>
                  <Text style={styles.ownerRole}>Owner</Text>
                </View>
                <View style={styles.contactButtonsContainer}>
                  <TouchableOpacity style={styles.messageButton}>
                    <Ionicons
                      name="chatbubble-outline"
                      size={20}
                      color="#F05A22"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.callButton}>
                    <Ionicons name="call-outline" size={20} color="#F05A22" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Description */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text.
              </Text>
            </View>
          </View>
        )}

        {activeTab === "Gallery" && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <View style={styles.galleryGrid}>
              <View style={styles.galleryRow}>
                <Image
                  source={{ uri: car.image }}
                  style={styles.galleryImage}
                  resizeMode="cover"
                />
                <Image
                  source={{ uri: car.image }}
                  style={styles.galleryImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.galleryRow}>
                <Image
                  source={{ uri: car.image }}
                  style={styles.galleryImage}
                  resizeMode="cover"
                />
                <Image
                  source={{ uri: car.image }}
                  style={styles.galleryImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
        )}

        {activeTab === "Review" && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Review</Text>
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewContainer}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewUser}>
                    <Image
                      source={{ uri: review.avatar }}
                      style={styles.reviewAvatar}
                    />
                    <View style={styles.reviewUserInfo}>
                      <Text style={styles.reviewUserName}>{review.name}</Text>
                      <Text style={styles.reviewUserRole}>{review.role}</Text>
                    </View>
                  </View>
                  <View style={styles.reviewDate}>
                    <Ionicons name="time-outline" size={14} color="#F05A22" />
                    <Text style={styles.reviewDateText}>{review.date}</Text>
                  </View>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
                <View style={styles.reviewRating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name="star"
                      size={16}
                      color={
                        star <= Math.floor(review.rating)
                          ? "#FFD700"
                          : star === Math.ceil(review.rating) &&
                            review.rating % 1 !== 0
                          ? "#FFD700"
                          : "#E0E0E0"
                      }
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Price and Rent Button */}
      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${car.price}</Text>
          <Text style={styles.dayText}>/day</Text>
        </View>
        <TouchableOpacity
          style={styles.rentNowButton}
          onPress={() =>
            router.push({
              pathname: "/booking",
              params: { id: car.id },
            })
          }
        >
          <Text style={styles.rentNowButtonText}>Rent Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  carImageContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 20,
  },
  carImage: {
    width: width * 0.9,
    height: 200,
  },
  indicator360Container: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#F05A22",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  indicator360Text: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  carInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  carTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  carTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  brandText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 15,
    marginRight: 30,
    position: "relative",
  },
  activeTabButton: {},
  tabText: {
    fontSize: 16,
    color: "#999",
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#F05A22",
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#F05A22",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  tabContent: {
    paddingHorizontal: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  ownerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ownerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  ownerInfo: {
    marginLeft: 15,
    flex: 1,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ownerRole: {
    fontSize: 14,
    color: "#999",
  },
  contactButtonsContainer: {
    flexDirection: "row",
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  comingSoonText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    padding: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dayText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
    marginLeft: 2,
  },
  rentNowButton: {
    backgroundColor: "#F05A22",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  rentNowButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  galleryGrid: {
    marginBottom: 20,
  },
  galleryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  galleryImage: {
    width: (width * 0.9 - 30) / 2,
    height: 100,
    borderRadius: 8,
  },
  reviewContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingBottom: 20,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewUserInfo: {
    marginLeft: 12,
  },
  reviewUserName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewUserRole: {
    fontSize: 12,
    color: "#999",
  },
  reviewDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewDateText: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 10,
  },
  reviewRating: {
    flexDirection: "row",
  },
});
