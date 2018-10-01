import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import propTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  containerButton: {
    padding: 10
  }
});

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.containerButton}>
      <Button
        title={'Contacts List'}
        onPress={() => {
          navigation.navigate('contacts');
        }}
      />
    </View>
    <View style={styles.containerButton}>
      <Button
        title={'Animations Demo'}
        onPress={() => {
          navigation.navigate('animations');
        }}
      />
    </View>
  </View>
);

Home.propTypes = {
  navigation: propTypes.object
};

export default withNavigation(Home);
