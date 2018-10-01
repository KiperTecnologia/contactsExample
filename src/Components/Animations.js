import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
  TextInput,
  Text
} from 'react-native';
import propTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: 100,
    height: 50,
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 2
  },
  itemView: {
    backgroundColor: '#29AB70',
    borderRadius: 2,
    flexDirection: 'row',
    width: 200,
    height: 50,
    justifyContent: 'space-between'
  },
  text: {
    color: 'white'
  }
});

const Item = ({ onRemove, item }) => {
  const animated = new Animated.Value(1);
  return (
    <Animated.View
      style={[
        styles.itemView,
        {
          opacity: animated,
          height: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50],
            extrapolate: 'clamp'
          })
        }
      ]}
    >
      <Text style={styles.text}>{item}</Text>
      <TouchableOpacity onPress={() => onRemove(item, animated)}>
        <Text style={styles.text}>Remove</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Animations = ({
  onChange,
  inputAnimation,
  text,
  setText,
  items,
  onRemove
}) => (
  <View style={styles.container}>
    <TouchableWithoutFeedback onPress={onChange} style={styles.touchInput}>
      <Animated.View
        style={[
          styles.input,
          {
            width: inputAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 300]
            })
          }
        ]}
      >
        <TextInput
          underlineColorAndroid={'transparent'}
          value={text}
          onFocus={onChange}
          onBlur={onChange}
          onChangeText={text => setText(text)}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
    <View style={{ height: 200, marginTop: 10 }}>
      <FlatList
        data={items}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Item item={item} onRemove={onRemove} key={item} />
        )}
      />
    </View>
  </View>
);

Animations.propTypes = {
  onChange: propTypes.func,
  inputAnimation: propTypes.object,
  text: propTypes.string,
  setText: propTypes.func,
  items: propTypes.array,
  onRemove: propTypes.func
};

export default Animations;
