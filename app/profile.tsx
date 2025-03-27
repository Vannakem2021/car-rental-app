import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  // Mock profile data
  const user = {
    name: "Robert Albert",
    email: "robertalbert123@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
  };

  // Settings/options menu items
  const menuItems = [
    {
      id: "edit",
      title: "Edit Profile",
      icon: "person-outline" as const,
      color: "#F05A22",
      route: "edit-profile",
    },
    {
      id: "license",
      title: "License",
      icon: "card-outline" as const,
      color: "#F05A22",
      route: "license",
    },
    {
      id: "passport",
      title: "Passport",
      icon: "document-text-outline" as const,
      color: "#F05A22",
      route: "passport",
    },
    {
      id: "payment",
      title: "Payment Methods",
      icon: "card-outline" as const,
      color: "#F05A22",
      route: "payment-methods",
    },
    {
      id: "booking",
      title: "My Booking",
      icon: "calendar-outline" as const,
      color: "#F05A22",
      route: "booking",
    },
    {
      id: "settings",
      title: "Settings",
      icon: "settings-outline" as const,
      color: "#F05A22",
      route: "settings",
    },
  ];

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
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholderView} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                // For now just show a console log since these screens don't exist yet
                console.log(`Navigate to ${item.title}`);
              }}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Ionicons
                name="chevron-forward"
                size={22}
                color="#CCCCCC"
                style={styles.chevron}
              />
            </TouchableOpacity>
          ))}
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
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: "#999",
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  menuIconContainer: {
    width: 24,
    marginRight: 15,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  chevron: {
    marginLeft: 10,
  },
});
