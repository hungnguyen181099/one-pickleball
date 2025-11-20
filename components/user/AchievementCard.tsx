import { Achievement } from "@/app/(tabs)/user";
import { styles } from "@/assets/styles/user";
import { Text, View } from "react-native";

export const AchievementCard = ({ item }: { item: Achievement }) => (
    <View style={[styles.achievementCard, item.locked && styles.achievementLocked]}>
        <Text style={styles.achievementEmoji}>{item.emoji}</Text>
        <Text style={styles.achievementName}>{item.name}</Text>
    </View>
);