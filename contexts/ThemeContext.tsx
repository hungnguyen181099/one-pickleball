import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextType {
    theme: 'light' | 'dark';
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    themeMode: 'auto',
    setThemeMode: () => { },
    toggleTheme: () => { },
});

const THEME_STORAGE_KEY = '@app_theme_mode';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const deviceColorScheme = useDeviceColorScheme();
    const [themeMode, setThemeModeState] = useState<ThemeMode>('auto');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Load saved theme preference
    useEffect(() => {
        loadThemePreference();
    }, []);

    // Update theme based on mode and device settings
    useEffect(() => {
        if (themeMode === 'auto') {
            setTheme(deviceColorScheme === 'dark' ? 'dark' : 'light');
        } else {
            setTheme(themeMode);
        }
    }, [themeMode, deviceColorScheme]);

    const loadThemePreference = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'auto')) {
                setThemeModeState(savedTheme as ThemeMode);
            }
        } catch (error) {
            console.error('Error loading theme preference:', error);
        }
    };

    const setThemeMode = async (mode: ThemeMode) => {
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
            setThemeModeState(mode);
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    };

    const toggleTheme = () => {
        const newMode = theme === 'light' ? 'dark' : 'light';
        setThemeMode(newMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, themeMode, setThemeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
