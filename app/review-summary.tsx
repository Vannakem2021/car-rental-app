import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { popularCars } from "./(tabs)/index";
import { carsByCategory } from "./(tabs)/explore";

export default function ReviewSummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [promoCode, setPromoCode] = useState("");

  // Assume we get the car data from params or we can use mock data for now
  const car = popularCars[0]; // Mock data for the Audi Q7

  // Mock booking details
  const bookingDetails = {
    pickupDate: "Mar 13, 2025",
    pickupTime: "07:12 PM",
    dropoffDate: "Mar 14, 2025",
    dropoffTime: "04:00 PM",
    rentType: "Self Driver",
    additional: 0,
    subtotal: 88,
    tax: 0,
    total: 88,
    selectedPayment: "paypal",
  };

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
        <Text style={styles.headerTitle}>Review Summary</Text>
        <View style={styles.placeholderView} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Car Info Card */}
        <View style={styles.carInfoCard}>
          <View style={styles.carInfoContent}>
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2016/12/03/18/57/car-1880381_960_720.jpg",
              }}
              style={styles.carImage}
            />
            <View style={styles.carDetails}>
              <Text style={styles.carName}>Audi Q7 50 Quattro</Text>
              <Text style={styles.carMake}>Audi</Text>
              <Text style={styles.carPrice}>
                ${bookingDetails.subtotal}/day
              </Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>4.5</Text>
            <Ionicons name="star" size={18} color="#FFC107" />
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.section}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pick-Up Date</Text>
            <Text style={styles.detailValue}>{bookingDetails.pickupDate}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pick-Up Time</Text>
            <Text style={styles.detailValue}>{bookingDetails.pickupTime}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Drop-Off Date</Text>
            <Text style={styles.detailValue}>{bookingDetails.dropoffDate}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Drop-Off Time</Text>
            <Text style={styles.detailValue}>{bookingDetails.dropoffTime}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rent Type</Text>
            <Text style={styles.detailValue}>{bookingDetails.rentType}</Text>
          </View>
        </View>

        {/* Pricing Details */}
        <View style={styles.section}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Additional Drive</Text>
            <Text style={styles.detailValue}>${bookingDetails.additional}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Subtotal</Text>
            <Text style={styles.detailValue}>${bookingDetails.subtotal}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tax</Text>
            <Text style={styles.detailValue}>${bookingDetails.tax}</Text>
          </View>
        </View>

        {/* Promo Code */}
        <View style={styles.promoContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Apply promo code"
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentMethodContainer}>
          <View style={styles.paymentMethod}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png",
              }}
              style={styles.paymentIcon}
            />
            <Text style={styles.paymentName}>PayPal</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Total Price */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Rental Price</Text>
          <Text style={styles.totalPrice}>${bookingDetails.total}</Text>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            // Handle payment completion
            // router.push('/confirmation');
          }}
        >
          <Text style={styles.payButtonText}>Pay ${bookingDetails.total}</Text>
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
    color: "#000",
  },
  placeholderView: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  carInfoCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  carInfoContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  carImage: {
    width: 80,
    height: 50,
    resizeMode: "contain",
    marginRight: 15,
  },
  carDetails: {
    flex: 1,
  },
  carName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  carMake: {
    fontSize: 14,
    color: "#999",
    marginBottom: 2,
  },
  carPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
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
  section: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  promoContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
  },
  promoInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
  },
  applyButton: {
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  applyButtonText: {
    color: "#F05A22",
    fontWeight: "500",
    fontSize: 14,
  },
  paymentMethodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 10,
  },
  paymentName: {
    fontSize: 14,
    fontWeight: "500",
  },
  changeText: {
    color: "#F05A22",
    fontWeight: "500",
    fontSize: 14,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F05A22",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
  },
  payButton: {
    backgroundColor: "#F05A22",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
