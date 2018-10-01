import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from 'react-native';
import propTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  withoutPermission: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerContact: {
    padding: 10,
    backgroundColor: 'white'
  },
  cardContact: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#69DEAD',
    padding: 10
  },
  text: {
    color: 'white'
  }
});

const Contacts = ({
  hasContactsPermission,
  contacts,
  loadMoreContacts,
  loading,
  firstLoading
}) => {
  return (
    <View style={styles.container}>
      {hasContactsPermission ? (
        <FlatList
          data={contacts}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.containerContact}>
              <View style={styles.cardContact}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.phones[0]}</Text>
              </View>
            </View>
          )}
          onEndReached={loadMoreContacts}
          onEndReachedThreshold={0.02}
          ListFooterComponent={loading ? <ActivityIndicator /> : <View />}
        />
      ) : (
        <View style={styles.withoutPermission}>
          {!firstLoading && !hasContactsPermission ? (
            <Text>Without permission for read contacts =|</Text>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      )}
    </View>
  );
};

Contacts.propTypes = {
  hasContactsPermission: propTypes.bool,
  contacts: propTypes.array,
  loadMoreContacts: propTypes.func,
  firstLoading: propTypes.bool
};

export default Contacts;
