import { SettingsItem } from "@/app/(tabs)/user";
import { styles } from "@/constants/styles/user.styles";
import { useThemedColors } from "@/hooks/use-theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const handleSettingPress = (item: SettingsItem) => {
    if (item.onPress) {
        item.onPress();
    } else if (item.route) {
        router.push(item.route as never);
    }
};

// Icons that use Ionicons instead of MaterialCommunityIcons
const ioniconsSet = ['moon', 'sunny', 'moon-outline', 'sunny-outline'];

export const SettingItemComponent = ({ item }: { item: SettingsItem }) => {
    const colors = useThemedColors();
    const useIonicons = ioniconsSet.includes(item.icon);

    return (
        <TouchableOpacity
            style={[
                styles.settingsItem,
                item.isLogout && styles.settingsItemLogout,
                { borderBottomColor: colors.border }
            ]}
            onPress={() => handleSettingPress(item)}
        >
            <View style={styles.settingsItemLeft}>
                {useIonicons ? (
                    <Ionicons
                        name={item.icon as any}
                        size={24}
                        color={item.isLogout ? '#FF4444' : colors.icon}
                    />
                ) : (
                    <MaterialCommunityIcons
                        name={item.icon as any}
                        size={24}
                        color={item.isLogout ? '#FF4444' : colors.icon}
                    />
                )}
                <Text style={[
                    styles.settingsItemLabel,
                    { color: item.isLogout ? '#FF4444' : colors.text }
                ]}>
                    {item.label}
                </Text>
            </View>
            {!item.isLogout && (
                <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
            )}
        </TouchableOpacity>
    );
};
