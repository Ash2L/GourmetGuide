import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NavBar = ({ triggerHapticFeedback }) => {
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateToHomeScreen = () => {
    navigation.navigate('Home');
    triggerHapticFeedback('medium');
    closeMenu();
  };

  const navigateToCategoryScreen = () => {
    navigation.navigate('Categories');
    triggerHapticFeedback('medium');
    closeMenu();
  };

  const navigateToPopularScreen = () => {
    navigation.navigate('Popular');
    triggerHapticFeedback('medium');
    closeMenu();
  };

  const navigateToBeefScreen = () => {
    navigation.navigate('Beef');
    triggerHapticFeedback('medium');
    closeMenu();
  };
  const navigateToPastaScreen = () => {
    navigation.navigate('Pasta');
    triggerHapticFeedback('medium');
    closeMenu();
  };
  const navigateToChickenScreen = () => {
    navigation.navigate('Chicken');
    triggerHapticFeedback('medium');
    closeMenu();
  };
  const navigateToVeggieScreen = () => {
    navigation.navigate('Veggie');
    triggerHapticFeedback('medium');
    closeMenu();
  };
  const navigateToSalmonScreen = () => {
    navigation.navigate('Salmon');
    triggerHapticFeedback('medium');
    closeMenu();
  };



  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#252525" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.navigationContainer}>
          <View style={styles.topHead}>
            <View style={styles.webName}>
              <Text style={styles.webNameText}>GourmetGuide</Text>
            </View>

            <View style={styles.hamBtn}>
              <TouchableOpacity onPress={toggleMenu}>
                <FontAwesome name="bars" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          {isMenuOpen && ( 
            <View style={styles.navBar}>
              <TouchableOpacity onPress={navigateToHomeScreen}>
                <Text style={styles.navLink}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToCategoryScreen}>
                <Text style={styles.navLink}>Categories</Text>
              </TouchableOpacity>
              {isMenuOpen && (
                <>
                  <TouchableOpacity onPress={navigateToPopularScreen}>
                    <Text style={styles.subNavLink}>Popular</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={navigateToBeefScreen}>
                    <Text style={styles.subNavLink}>Beef</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={navigateToPastaScreen}>
                    <Text style={styles.subNavLink}>Pasta</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={navigateToChickenScreen}>
                    <Text style={styles.subNavLink}>Chicken</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={navigateToVeggieScreen}>
                    <Text style={styles.subNavLink}>Veggie</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={navigateToSalmonScreen}>
                    <Text style={styles.subNavLink}>Salmon</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: '#6c2500',
    paddingTop: Platform.OS === 'android' || Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 16,
    marginTop: "5%",
  },
  navigationContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  topHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  webName: {
    flex: 1,
  },
  webNameText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  hamBtn: {
    marginLeft: 10,
  },
  navBar: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    backgroundColor: '#713a00',
    borderRadius:10,
  },
  navLink: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    padding: 15,
  },
  subNavLink: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 30, 
    padding: 15,
  },
});

export default NavBar;
