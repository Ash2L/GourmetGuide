import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView, 
  Button,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/NavBar';
import * as Haptics from 'expo-haptics';

const triggerLightHaptic = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

const CustomButton = ({ title, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const RecipeListByLetter = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleReload = () => {
    setSearchQuery('');
    setSearchResults([]);
    setCurrentPage(1);
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);

      const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;

      const response = await axios.get(apiUrl);
      const recipes = response.data.meals;

      setSearchResults(recipes);
      setCurrentPage(1);
    } catch (error) { 
      console.error('Error searching recipes:', error);
    } finally { 
      setIsLoading(false); 
    }
  };
  useEffect(() => {
    const fetchRecipesByLetter = async (letter) => {
      try {
        setIsLoading(true); 

        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
        );
        const data = response.data.meals;
        if (data) {
          return data;
        }
      } catch (error) {
        console.error(`Error fetching data for letter '${letter}':`, error);
      } finally {
        setIsLoading(false); 
      }
      return [];
    };

    const fetchAllRecipes = async () => {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz';
      const allRecipes = [];

      for (const letter of alphabet) {
        const recipesForLetter = await fetchRecipesByLetter(letter);
        allRecipes.push(...recipesForLetter);
      }

      setRecipes(allRecipes);
    };

    fetchAllRecipes();
  }, []);

  const totalPages = Math.ceil((searchResults.length > 0 ? searchResults : recipes).length / recipesPerPage);

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

  const recipesToDisplay = (searchResults.length > 0 ? searchResults : recipes).slice(startIndex, endIndex);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search for Recipes</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for recipes"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <CustomButton
          title="Search"
          onPress={handleSearch}
          backgroundColor="#6bc3ff" 
        />
        <TouchableOpacity onPress={handleReload} style={styles.reloadButton}>
          <Text style={styles.reloadButtonText}>Reload 🔄 </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading recipes...</Text>
        </View>
      ) : (
        <FlatList
          data={recipesToDisplay}
          keyExtractor={(item) => item.idMeal.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recipeItem}
              onPress={() => {
                navigation.navigate('RecipeDetail', { recipe: item });
                triggerLightHaptic();
              }}
            >
              <Image source={{ uri: item.strMealThumb }} style={styles.recipeImage} />
              <Text style={styles.recipeTitle}>{item.strMeal}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.pagination}>
        <Button
          title="Previous Page"
          onPress={handlePrevPage}
          disabled={currentPage === 1}
          style={styles.pageButton}
        />
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
                currentPage === index + 1 && styles.currentPageNumber,
              ]}
              onPress={() => handlePageClick(index + 1)}
            >
              <Text style={styles.pageNumberText}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Button
          title="Next Page"
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
          style={styles.pageButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '4%',
    paddingTop: '3%',
    backgroundColor: '#fff8b7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
  },
  recipeImage: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 5,
    marginRight: '3%',
  },
  recipeTitle: {
    fontSize: 18,
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
  currentPageNumber: {
    backgroundColor: '#69c2ff',
  },
  pageNumberText: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
  },
  searchInput: {
    flex: 1,
    width: '70%',
    height: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: '2%',
    margin: '1%',
  },
  reloadButton: {
    backgroundColor: '#6bc3ff',
    margin: '1%',
    padding: '1.5%',
    borderRadius: 5,
    alignItems: 'center',
  },
  reloadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#6bc3ff',
    margin: '1%',
    padding: '1.5%',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RecipeListByLetter;
