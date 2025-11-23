import { Achievement } from "@/app/(tabs)/user";
import { styles } from "@/assets/styles/user.styles";
import { useThemedColors } from "@/hooks/use-theme";
import { Text, View } from "react-native";

export const AchievementCard = ({ item }: { item: Achievement }) => {
    const colors = useThemedColors();

    return (
        <View style={[
            styles.achievementCard,
            item.locked && styles.achievementLocked,
            { backgroundColor: colors.cardSecondary }
        ]}>
            <Text style={styles.achievementEmoji}>{item.emoji}</Text>
            <Text style={[styles.achievementName, { color: colors.text }]}>{item.name}</Text>
        </View>
    );
};