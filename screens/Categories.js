import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import NavBar from '../components/NavBar';
import * as Haptics from 'expo-haptics';


const Categories = [
  {
    id: '1',
    title: 'Popular',
    image: require('../images/popular.jpeg'),
    page: 'Popular',
  },
  {
    id: '2',
    title: 'Beef',
    image: require('../images/beef.jpeg'),
    page: 'Beef',
  },
  {
    id: '3',
    title: 'Pasta',
    image: require('../images/pasta.jpeg'), 
    page: 'Pasta',
  },
  {
    id: '4',
    title: 'Chicken',
    image: require('../images/chicken.jpeg'),
    page: 'Chicken',
  },
  {
    id: '5',
    title: 'Veggie',
    image: require('../images/veggie.jpeg'),
    page: 'Veggie',
  },
  {
    id: '6',
    title: 'Salmon',
    image: require('../images/salmon.jpeg'),
    page: 'Salmon',
  },
];
const CategoriesScreen = ({ navigation }) => {
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

  const navigateToCategoryPage = (page, recipeId) => {
    if (page === 'Popular' || page === 'Salmon' || page === 'Categories' 
     || page === 'Chicken' || page === 'Beef' 
     || page === 'Veggie' || page === 'Pasta') {
      navigation.navigate(page);
      triggerHapticFeedback('medium');
    } else {
      // Handle other category navigation or actions
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Category</Text>
      <FlatList
        data={Categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeItem}
            onPress={() => navigateToCategoryPage(item.page, item.id)}
          >
            <Image source={item.image} style={styles.recipeImage} />
            <Text style={styles.recipeTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8b7',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 16,
  },
  recipeTitle: {
    fontSize: 18,
  },
});

export default CategoriesScreen;
