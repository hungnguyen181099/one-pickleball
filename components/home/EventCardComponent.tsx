import { EventCard } from "@/app/(tabs)";
import { styles } from "@/assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export const EventCardComponent = ({ item }: { item: EventCard }) => (
    <TouchableOpacity
        style={styles.eventCard}
        activeOpacity={0.8}
        onPress={() => {
            router.push({
                pathname: '/(details)/eventDetail/[id]',
                params: { id: item.id }
            })
        }}
    >
        {item.badge && (
            <View style={styles.eventBadge}>
                <Text style={styles.eventBadgeText}>{item.badge}</Text>
            </View>
        )}
        <Image source={{ uri: item.image }} style={[styles.eventImage, { backgroundColor: item.image as any }]} />
        <View style={styles.eventContent}>
            <View style={styles.eventDate}>
                <Ionicons name="calendar-outline" size={14} color="#666" />
                <Text style={styles.eventDateText}>{item.date}</Text>
            </View>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <View style={styles.eventMeta}>
                <View style={styles.eventLocation}>
                    <Ionicons name="location-outline" size={12} color="#666" />
                    <Text style={styles.eventLocationText}>{item.location}</Text>
                </View>
                <Text style={styles.eventMetaText}>{item.meta}</Text>
            </View>
        </View>
    </TouchableOpacity>
);