import { StatCardProps } from "@/app/(tabs)/user";
import { styles } from "@/assets/styles/user";
import { Text, View } from "react-native";

export const StatCard = ({ item }: { item: StatCardProps }) => (
    <View style={styles.statCard}>
        <Text style={styles.statNumber}>{item.number}</Text>
        <Text style={styles.statLabel}>{item.label}</Text>
    </View>
);