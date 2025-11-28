import { useTheme, useThemedColors } from "@/hooks/use-theme";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

export const StatusBarWrapper = () => {
    const { theme } = useTheme();
    const colors = useThemedColors();
    useEffect(()=>{},[colors.background ])

    return (
        <StatusBar
            backgroundColor={colors.background}
            style={theme === 'dark' ? 'light' : 'dark'}
            animated
        />
    );
};