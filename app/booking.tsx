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
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { popularCars } from "./(tabs)/index";
import { carsByCategory } from "./(tabs)/explore";

export default function BookingScreen() {
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
      const foundCar = categoryCarList.find((c) => c.id === carId);
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

  // Set initial values for the form
  const [pickupLocation, setPickupLocation] = useState(
    "New York (JFK) - John F. Kennedy International Airport"
  );
  const [dropoffLocation, setDropoffLocation] = useState(
    "New York (JFK) - John F. Kennedy International Airport"
  );
  const [pickupDate, setPickupDate] = useState("12/03/25");
  const [pickupTime, setPickupTime] = useState("7:12 PM");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  // Date picker states
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 13)); // March 13, 2025
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2, 1)); // March 2025
  const [datePickerType, setDatePickerType] = useState<"pickup" | "return">(
    "pickup"
  );

  // Time picker states
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [timePickerType, setTimePickerType] = useState<"pickup" | "return">(
    "pickup"
  );

  // Generate hours and minutes
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 4 }, (_, i) => i * 15);
  const periods = ["AM", "PM"];

  // Selected time components
  const [selectedHour, setSelectedHour] = useState(7);
  const [selectedMinute, setSelectedMinute] = useState(12);
  const [selectedPeriod, setSelectedPeriod] = useState("PM");

  // Generate days for the calendar
  const generateCalendarDays = () => {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    const days = [];

    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: 0, date: null });
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      );
      days.push({ day: i, date });
    }

    return days;
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  };

  // Handle date selection
  const handleDateSelection = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      const formattedDate = `${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date
        .getFullYear()
        .toString()
        .substring(2)}`;

      if (datePickerType === "pickup") {
        setPickupDate(formattedDate);
      } else {
        setReturnDate(formattedDate);
      }
    }
  };

  // Open date picker for specific field
  const openDatePicker = (type: "pickup" | "return") => {
    setDatePickerType(type);
    setDatePickerVisible(true);
  };

  // Get month name
  const getMonthName = (month: number) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month];
  };

  // Days of the week labels
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calendar days
  const calendarDays = generateCalendarDays();

  // Open time picker for specific field
  const openTimePicker = (type: "pickup" | "return") => {
    setTimePickerType(type);

    // Parse the current time if available
    if (type === "pickup" && pickupTime) {
      parseTimeString(pickupTime);
    } else if (type === "return" && returnTime) {
      parseTimeString(returnTime);
    } else {
      // Default to current time components
      setSelectedHour(7);
      setSelectedMinute(12);
      setSelectedPeriod("PM");
    }

    setTimePickerVisible(true);
  };

  // Parse time string into components
  const parseTimeString = (timeString: string) => {
    try {
      const [time, period] = timeString.split(" ");
      let [hour, minute] = time.split(":").map(Number);

      setSelectedHour(hour);
      setSelectedMinute(minute);
      setSelectedPeriod(period);
    } catch (error) {
      // Use default if parsing fails
      setSelectedHour(7);
      setSelectedMinute(12);
      setSelectedPeriod("PM");
    }
  };

  // Handle time selection
  const handleTimeSelection = () => {
    const formattedTime = `${selectedHour}:${
      selectedMinute === 0 ? "00" : selectedMinute
    } ${selectedPeriod}`;

    if (timePickerType === "pickup") {
      setPickupTime(formattedTime);
    } else {
      setReturnTime(formattedTime);
    }

    setTimePickerVisible(false);
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
        <Text style={styles.headerTitle}>Booking</Text>
        <View style={styles.placeholderView} />
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

        {/* Booking Form */}
        <View style={styles.formContainer}>
          {/* Pick-Up Location */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Pick-Up Location</Text>
            <TouchableOpacity style={styles.inputContainer}>
              <Text style={styles.inputText}>{pickupLocation}</Text>
            </TouchableOpacity>
          </View>

          {/* Drop-Off Location */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Drop-Off Location</Text>
            <TouchableOpacity style={styles.inputContainer}>
              <Text style={styles.inputText}>{dropoffLocation}</Text>
            </TouchableOpacity>
          </View>

          {/* Pick-Up Date and Time */}
          <View style={styles.dateTimeRow}>
            <View style={[styles.formField, styles.halfField]}>
              <Text style={styles.fieldLabel}>Pick-Up Date</Text>
              <TouchableOpacity
                style={styles.dateTimeContainer}
                onPress={() => openDatePicker("pickup")}
              >
                <Text style={styles.dateTimeText}>{pickupDate}</Text>
                <Ionicons name="calendar-outline" size={20} color="#F05A22" />
              </TouchableOpacity>
            </View>

            <View style={[styles.formField, styles.halfField]}>
              <Text style={styles.fieldLabel}>Pick-Up Time</Text>
              <TouchableOpacity
                style={styles.dateTimeContainer}
                onPress={() => openTimePicker("pickup")}
              >
                <Text style={styles.dateTimeText}>{pickupTime}</Text>
                <Ionicons name="time-outline" size={20} color="#F05A22" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Return Date and Time */}
          <View style={styles.dateTimeRow}>
            <View style={[styles.formField, styles.halfField]}>
              <Text style={styles.fieldLabel}>Pick-Up Date</Text>
              <TouchableOpacity
                style={styles.dateTimeContainer}
                onPress={() => openDatePicker("return")}
              >
                <Text style={styles.dateTimeText}>
                  {returnDate ? returnDate : "Select date"}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="#F05A22" />
              </TouchableOpacity>
            </View>

            <View style={[styles.formField, styles.halfField]}>
              <Text style={styles.fieldLabel}>Pick-Up Time</Text>
              <TouchableOpacity
                style={styles.dateTimeContainer}
                onPress={() => openTimePicker("return")}
              >
                <Text style={styles.dateTimeText}>
                  {returnTime ? returnTime : "Select time"}
                </Text>
                <Ionicons name="time-outline" size={20} color="#F05A22" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Insurance */}
          <View style={styles.insuranceContainer}>
            <Text style={styles.fieldLabel}>Insurance</Text>
            <Text style={styles.insuranceText}>
              By renting a car at Renter, you agree to the included insurance
              coverage... <Text style={styles.seeMoreText}>See More</Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Continue Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push("/billing")}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <Modal
        visible={datePickerVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.datePickerContainer}>
            <View style={styles.datePickerHeader}>
              <Text style={styles.datePickerTitle}>Select Date</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setDatePickerVisible(false)}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.monthNavigator}>
              <TouchableOpacity
                style={styles.monthArrow}
                onPress={goToPreviousMonth}
              >
                <Ionicons name="chevron-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.monthYearText}>
                {getMonthName(currentMonth.getMonth())} -{" "}
                {currentMonth.getFullYear()}
              </Text>
              <TouchableOpacity
                style={styles.monthArrow}
                onPress={goToNextMonth}
              >
                <Ionicons name="chevron-forward" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.calendar}>
              {/* Days of week headers */}
              <View style={styles.daysOfWeekRow}>
                {daysOfWeek.map((day, index) => (
                  <Text key={index} style={styles.dayOfWeekText}>
                    {day}
                  </Text>
                ))}
              </View>

              {/* Calendar grid */}
              <View style={styles.calendarGrid}>
                {calendarDays.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.calendarDay,
                      item.day === 0 && styles.emptyDay,
                      item.date &&
                        item.date.getDate() === selectedDate.getDate() &&
                        item.date.getMonth() === selectedDate.getMonth() &&
                        item.date.getFullYear() ===
                          selectedDate.getFullYear() &&
                        styles.selectedDay,
                    ]}
                    onPress={() => item.date && handleDateSelection(item.date)}
                    disabled={item.day === 0}
                  >
                    {item.day > 0 && (
                      <Text
                        style={[
                          styles.calendarDayText,
                          item.date &&
                            item.date.getDate() === selectedDate.getDate() &&
                            item.date.getMonth() === selectedDate.getMonth() &&
                            item.date.getFullYear() ===
                              selectedDate.getFullYear() &&
                            styles.selectedDayText,
                        ]}
                      >
                        {item.day}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => {
                handleDateSelection(selectedDate);
                setDatePickerVisible(false);
              }}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time Picker Modal */}
      <Modal
        visible={timePickerVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.timePickerContainer}>
            <View style={styles.datePickerHeader}>
              <Text style={styles.datePickerTitle}>Select Time</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setTimePickerVisible(false)}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.timePickerContent}>
              {/* Hour selection */}
              <View style={styles.timeColumn}>
                <Text style={styles.timeColumnHeader}>Hour</Text>
                <FlatList
                  data={hours}
                  keyExtractor={(item) => item.toString()}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.timeList}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.timeItem,
                        selectedHour === item && styles.selectedTimeItem,
                      ]}
                      onPress={() => setSelectedHour(item)}
                    >
                      <Text
                        style={[
                          styles.timeItemText,
                          selectedHour === item && styles.selectedTimeItemText,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>

              {/* Minute selection */}
              <View style={styles.timeColumn}>
                <Text style={styles.timeColumnHeader}>Minute</Text>
                <FlatList
                  data={minutes}
                  keyExtractor={(item) => item.toString()}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.timeList}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.timeItem,
                        selectedMinute === item && styles.selectedTimeItem,
                      ]}
                      onPress={() => setSelectedMinute(item)}
                    >
                      <Text
                        style={[
                          styles.timeItemText,
                          selectedMinute === item &&
                            styles.selectedTimeItemText,
                        ]}
                      >
                        {item === 0 ? "00" : item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>

              {/* AM/PM selection */}
              <View style={styles.timeColumn}>
                <Text style={styles.timeColumnHeader}>AM/PM</Text>
                <FlatList
                  data={periods}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.timeList}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.timeItem,
                        selectedPeriod === item && styles.selectedTimeItem,
                      ]}
                      onPress={() => setSelectedPeriod(item)}
                    >
                      <Text
                        style={[
                          styles.timeItemText,
                          selectedPeriod === item &&
                            styles.selectedTimeItemText,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleTimeSelection}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  placeholderView: {
    width: 40,
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
  formContainer: {
    paddingHorizontal: 20,
  },
  formField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  inputText: {
    fontSize: 14,
    color: "#333",
  },
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfField: {
    width: "48%",
  },
  dateTimeContainer: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateTimeText: {
    fontSize: 14,
    color: "#333",
  },
  insuranceContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
  insuranceText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  seeMoreText: {
    color: "#F05A22",
    fontWeight: "bold",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
  },
  continueButton: {
    backgroundColor: "#F05A22",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerContainer: {
    width: width * 0.9,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
  },
  datePickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  datePickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  monthNavigator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  monthArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calendar: {
    marginBottom: 20,
  },
  daysOfWeekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dayOfWeekText: {
    width: (width * 0.9 - 40) / 7,
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  calendarDay: {
    width: (width * 0.9 - 40) / 7,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  calendarDayText: {
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: "#F05A22",
    borderRadius: 20,
  },
  selectedDayText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  emptyDay: {
    backgroundColor: "transparent",
  },
  timePickerContainer: {
    width: width * 0.9,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
  },
  timePickerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  timeColumn: {
    width: "30%",
    alignItems: "center",
  },
  timeColumnHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  timeList: {
    paddingVertical: 10,
  },
  timeItem: {
    width: 60,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 20,
  },
  selectedTimeItem: {
    backgroundColor: "#F05A22",
  },
  timeItemText: {
    fontSize: 16,
  },
  selectedTimeItemText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
