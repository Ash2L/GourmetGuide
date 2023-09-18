import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const SalmonRecipes = () => {
  const [salmonRecipes, setSalmonRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  useEffect(() => {
    fetchAllSalmonRecipes();
  }, []);

  const fetchAllSalmonRecipes = async () => {
    try {
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'
      );

      const salmonRecipesData = response.data.meals || [];

      const detailedSalmonRecipes = await Promise.all(
        salmonRecipesData.map(async (recipe) => {
          const detailedResponse = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
          );
          return detailedResponse.data.meals[0];
        })
      );

      setSalmonRecipes(detailedSalmonRecipes);
    } catch (error) {
      console.error('Error fetching salmon recipes:', error);
    }
  };

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

  const totalPages = Math.ceil(salmonRecipes.length / recipesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;

  const currentRecipes = salmonRecipes.slice(startIndex, endIndex);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Salmon Recipes</Text>
      <ScrollView>
        {currentRecipes.length > 0 ? (
          <View>
            {currentRecipes.map((recipe, index) => (
              <View key={index} style={styles.recipeContainer}>
                <Image
                  source={{ uri: recipe.strMealThumb }}
                  style={styles.recipeImage}
                />
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
            ))}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
      <View style={styles.pagination}>
        <TouchableOpacity
          style={[styles.pageButton, { opacity: currentPage === 1 ? 0.5 : 1 }]}
          onPress={handlePrevPage}
          disabled={currentPage === 1}
        >
          <Text style={styles.pageButtonText}>Previous Page</Text>
        </TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pageNumbers}
        >
          {Array.from({ length: totalPages }).map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.pageNumber,
                currentPage === index + 1 && { backgroundColor: '#69c2ff' },
              ]}
              onPress={() => handlePageClick(index + 1)}
            >
              <Text style={styles.pageNumberText}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={[
            styles.pageButton,
            { opacity: currentPage === totalPages ? 0.5 : 1 },
          ]}
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.pageButtonText}>Next Page</Text>
        </TouchableOpacity>
      </View>
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
  recipeContainer: {
    backgroundColor: '#ffe91a',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
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
  recipeImage: {
    width: '80%',
    height: 300, 
    resizeMode: 'cover', 
    marginBottom: 8,
    alignItems: 'center',
  },
  pageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  pageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  pageNumbers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pageNumber: {
    backgroundColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 5,
  },
  pageNumberText: {
    fontSize: 16,
  },
});

export default SalmonRecipes;
