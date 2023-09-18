import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import Popular from './screens/Popular';
import Pasta from './screens/Pasta';
import Salmon from './screens/Salmon';
import Chicken from './screens/Chicken';
import Veggie from './screens/Veggie';
import Beef from './screens/Beef';
import HomeScreen from './screens/HomeScreen';
import RecipeDetail from './screens/RecipeDetail';
import Categories from './screens/Categories';
import NavBar from './components/NavBar';
import NotificationApp from './screens/notification';

const Stack = createNativeStackNavigator();

const triggerHapticFeedback = (style) => {
  switch (style) {
    case 'light':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case 'medium':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    case 'heavy':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      break;
    default:
      break;
  }
};

function App() {
  return (
    <NavigationContainer>
      <NavBar triggerHapticFeedback={triggerHapticFeedback} />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: { backgroundColor: '#fff8b7' }, 
          }}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{
            headerStyle: { backgroundColor: '#fff8b7' }, 
          }}
        />
        <Stack.Screen
          name="Popular"
          component={Popular}
          options={{
            headerStyle: { backgroundColor: '#fff8b7' }, 
          }}
        />
        <Stack.Screen
          name="Pasta"
          component={Pasta}
          options={{
            headerStyle: { backgroundColor: '#fff8b7' }, 
          }}
        />
        <Stack.Screen
          name="Salmon"
          component={Salmon}
          options={{
            headerStyle: { backgroundColor: '#fff8b7' }, 
          }}
        />
        <Stack.Screen
          name="Beef"
          component={Beef}
          options={{
            headerStyle: { backgroundColor: '#fff8b7' }, 
          }}
        />
        <Stack.Screen
          name="Veggie"
          component={Veggie}
          options={{
            headerStyle: { backgroundColor: '#fff8b7' }, 
          }}
        />
        <Stack.Screen
          name="Chicken"
          component={Chicken}
          options={{
            headerStyle: { backgroundColor: '#fff8b7' }, 
          }}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetail}
          options={{
            headerStyle: { backgroundColor: '#fff8b7' }, 
          }}
        />
      </Stack.Navigator>
      <NotificationApp />
    </NavigationContainer>
  );
}

export default App;
