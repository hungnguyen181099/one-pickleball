import { StatCardProps } from "@/app/(tabs)/user";
import { styles } from "@/assets/styles/user";
import { useThemedColors } from "@/hooks/use-theme";
import { Text, View } from "react-native";

export const StatCard = ({ item }: { item: StatCardProps }) => {
    const colors = useThemedColors();

    return (
        <View style={[styles.statCard, { backgroundColor: colors.cardSecondary }]}>
            <Text style={styles.statNumber}>{item.number}</Text>
            <Text style={[styles.statLabel, { color: colors.textTertiary }]}>{item.label}</Text>
        </View>
    );
};