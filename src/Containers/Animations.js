import { compose, withHandlers, withState } from 'recompose';
import { Animated } from 'react-native';
import Animations from '../Components/Animations';

const items = ['test', 'test2', 'test3'];

const onChange = ({ changeSize, setChangeSize, inputAnimation }) => () => {
  setChangeSize(!changeSize);
  Animated.spring(inputAnimation, {
    toValue: !changeSize ? 1 : 0,
    duration: 150
  }).start();
};

const onRemove = ({ setItems, items }) => (itemSelected, animated) => {
  const newItems = items.filter(item => item !== itemSelected);
  Animated.timing(animated, {
    toValue: 0,
    duration: 1000
  }).start(() => setItems(newItems));
};

const enhance = compose(
  withState('changeSize', 'setChangeSize', false),
  withState('inputAnimation', 'setInputAnimation', new Animated.Value(0)),
  withState('text', 'setText', ''),
  withState('items', 'setItems', items),
  withHandlers({ onChange, onRemove })
);

export default enhance(Animations);
