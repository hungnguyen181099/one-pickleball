import * as NavigationBar from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import { useTheme, useThemedColors } from '@/hooks/use-theme';

export const NavigationBarWrapper = () => {
    const { theme } = useTheme();
    const colors = useThemedColors();

    useEffect(() => {
        const updateNavigationBar = async () => {
            if (Platform.OS === 'android') {
                try {
                    // With edge-to-edge enabled (default in Expo SDK 50+), the navigation bar is transparent.
                    // To change its apparent background color, we update the root view background color using SystemUI.
                    await SystemUI.setBackgroundColorAsync(colors.card);

                    // Update the button style (light/dark icons) to ensure visibility
                    await NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
                } catch (error) {
                    console.error('Failed to update navigation bar:', error);
                }
            }
        };

        updateNavigationBar();
    }, [theme, colors.card]);

    return null;
};
