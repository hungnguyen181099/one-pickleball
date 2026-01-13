import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

// Configure how notifications should be displayed when app is in foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export function usePushNotifications() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
    const notificationListener = useRef<Notifications.Subscription>(undefined);
    const responseListener = useRef<Notifications.Subscription>(undefined);

    async function registerForPushNotificationsAsync() {
        let token;

        // Set up Android notification channel
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'Thông báo mặc định',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#00D9B5',
            });
        }

        // Only request on physical device
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                console.log('Push notification permission not granted');
                return;
            }

            // Get Expo push token
            try {
                const projectId =
                    Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

                if (!projectId) {
                    throw new Error('Project ID not found');
                }

                token = (
                    await Notifications.getExpoPushTokenAsync({
                        projectId,
                    })
                ).data;

                console.log('Expo Push Token:', token);
            } catch (e) {
                console.error('Error getting push token:', e);
                token = undefined;
            }
        } else {
            console.log('Must use physical device for Push Notifications');
        }

        return token;
    }

    useEffect(() => {
        // Register for push notifications and get token
        registerForPushNotificationsAsync().then((token) => setExpoPushToken(token ?? ''));

        // Listen for incoming notifications
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        // Listen for notification responses (user taps on notification)
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log('Notification response:', response);
            // TODO: Handle navigation based on notification data
        });

        return () => {
            if (notificationListener.current) {
                notificationListener.current.remove();
            }
            if (responseListener.current) {
                responseListener.current.remove();
            }
        };
    }, []);

    return {
        expoPushToken,
        notification,
    };
}
