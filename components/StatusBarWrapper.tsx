import { useTheme, useThemedColors } from "@/hooks/use-theme";
import { StatusBar } from "expo-status-bar";

export const StatusBarWrapper = () => {
    const { theme } = useTheme();
    const colors = useThemedColors();

    return (
        <StatusBar
            backgroundColor={colors.background}
            style={theme === 'dark' ? 'light' : 'dark'}
            animated
        />
    );
};