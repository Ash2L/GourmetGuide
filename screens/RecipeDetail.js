import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const RecipeDetail = ({ route }) => {
  const { recipe } = route.params;

  const formatIngredients = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient) {
        const measurement = recipe[`strMeasure${i}`];
        ingredients.push(`${measurement} ${ingredient}`);
      }
    }
    return ingredients.join(', ');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.recipeContainer}>
          <Image source={{ uri: recipe.strMealThumb }} style={styles.recipeImage} />
          <Text style={styles.recipeName}>Name: {recipe.strMeal}</Text>
          <Text style={styles.recipeDetails}>
            Category: {recipe.strCategory}
          </Text>
          <Text style={styles.recipeDetails}>
            Instructions: {recipe.strInstructions}
          </Text>
          <Text style={styles.recipeDetails}>
            Ingredients: {formatIngredients(recipe)}
          </Text>
        </View>
      </ScrollView>
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
  recipeContainer: {
    backgroundColor: '#ffe91a', 
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  recipeImage: {
    width: '80%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 8,
    alignItems: 'center',
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  recipeDetails: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});

export default RecipeDetail;
