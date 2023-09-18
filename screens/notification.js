import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics'; 
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener(() => {
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(() => {
    });

    // Schedule the first notification after 5 seconds
    const notificationTimeout1 = setTimeout(async () => {
      await schedulePushNotification('Breakfast is the most important meal of the day, find the perfect recipe to whip up a delicious breakfast for you now!', { data: 'Any data comes here' });
    }, 5000);

    // Schedule the second notification after 20 seconds
    const notificationTimeout2 = setTimeout(async () => {
      await schedulePushNotification('Getting hungry? Choose from the wide array of recipes to cook yourself a delicious meal now.', { data: 'Any data comes here' });
    }, 20000);

    return () => {
      clearTimeout(notificationTimeout1);
      clearTimeout(notificationTimeout2);
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return null;
}

async function schedulePushNotification(title, body, data) {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: { seconds: 20 },
  });
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    // Use your project ID here
    await Notifications.getExpoPushTokenAsync({
      projectId: '59850bd4-c8ba-4859-ac05-79c47eb1f900',
    });
  } else {
    console.log('Must use a physical device for Push Notifications');
  }
}
