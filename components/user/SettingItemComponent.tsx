import { SettingsItem } from "@/app/(tabs)/user";
import { styles } from "@/assets/styles/user";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const handleSettingPress = (item: SettingsItem) => {
    if (item.onPress) {
        item.onPress();
    } else if (item.route) {
        router.navigate(item.route as never);
    }
};

export const SettingItemComponent = ({ item }: { item: SettingsItem }) => (
    <TouchableOpacity
        style={[styles.settingsItem, item.isLogout && styles.settingsItemLogout]}
        onPress={() => handleSettingPress(item)}
    >
        <View style={styles.settingsItemLeft}>
            <MaterialCommunityIcons
                name={item.icon as any}
                size={24}
                color={item.isLogout ? '#FF4444' : '#666'}
            />
            <Text style={[styles.settingsItemLabel, item.isLogout && styles.settingsLogoutText]}>
                {item.label}
            </Text>
        </View>
        {!item.isLogout && (
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
        )}
    </TouchableOpacity>
);
