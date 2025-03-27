import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

// Define an interface for chat user data
interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
  unread: number;
  online: boolean;
}

export default function ChatScreen() {
  const router = useRouter();

  // Mock chat data
  const chatUsers: ChatUser[] = [
    {
      id: "1",
      name: "David Peter",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      message: "Hi, Good morning",
      time: "09:00 PM",
      unread: 1,
      online: true,
    },
    {
      id: "2",
      name: "Arlo Mateo",
      avatar: "https://randomuser.me/api/portraits/men/43.jpg",
      message: "I want to rent a car...",
      time: "07:05 PM",
      unread: 0,
      online: true,
    },
    {
      id: "3",
      name: "Archie Oscar",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      message: "I need a car...",
      time: "06:06 PM",
      unread: 2,
      online: false,
    },
    {
      id: "4",
      name: "George Henry",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
      message: "Hi, Good afternoon",
      time: "04:30 PM",
      unread: 0,
      online: false,
    },
    {
      id: "5",
      name: "Michael William",
      avatar: "https://randomuser.me/api/portraits/men/71.jpg",
      message: "I want to book a car",
      time: "11:31 AM",
      unread: 0,
      online: true,
    },
    {
      id: "6",
      name: "Richard Charles",
      avatar: "https://randomuser.me/api/portraits/men/29.jpg",
      message: "Hi, Good morning",
      time: "11:15 AM",
      unread: 0,
      online: true,
    },
    {
      id: "7",
      name: "Anthony Edward",
      avatar: "https://randomuser.me/api/portraits/men/18.jpg",
      message: "Thank you for your help",
      time: "09:14 AM",
      unread: 0,
      online: false,
    },
  ];

  // Render each chat user item
  const renderChatItem = ({ item }: { item: ChatUser }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.online && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={styles.chatPreview}>
          <Text style={styles.messageText} numberOfLines={1}>
            {item.message}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Chat</Text>
        <View style={styles.placeholderView} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search chat, people and more..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Chat List */}
      <FlatList
        data={chatUsers}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatList}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  chatList: {
    paddingHorizontal: 20,
  },
  chatItem: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  chatContent: {
    flex: 1,
    justifyContent: "center",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  timeText: {
    fontSize: 12,
    color: "#999",
  },
  chatPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messageText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#F05A22",
    justifyContent: "center",
    alignItems: "center",
  },
  unreadText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
