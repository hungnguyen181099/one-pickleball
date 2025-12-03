import { useTheme, useThemedColors } from "@/hooks/use-theme";
import { useEffect } from "react";
import { StatusBar } from "react-native";

export const StatusBarWrapper = () => {
    const { theme } = useTheme();
    const colors = useThemedColors();
    useEffect(() => {
    }, [theme, colors.background])

    return (
        <StatusBar
            barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
            backgroundColor={colors.background}
            animated
        />
    );
};