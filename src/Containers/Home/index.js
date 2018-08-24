import { compose, lifecycle, withState, withHandlers } from 'recompose';
import Home from '../../Components/Home';
import kiperContacts from 'react-native-kiper-contacts';
import checkContactsPermission from '../../Services/requestPermission';

const loadMoreContacts = ({
  contacts,
  setContacts,
  offset,
  setOffset,
  setLoading
}) => async () => {
  setLoading(true);
  const newOffset = offset + 10;
  let result = await kiperContacts.getAll(10, newOffset);
  result = contacts.concat(result);
  setContacts(result);
  setOffset(newOffset);
  setLoading(false);
};

const loadContacts = ({ setContacts, setLoading }) => async offset => {
  setLoading(true);
  const result = await kiperContacts.getAll(10, offset);
  setContacts(result);
  setLoading(false);
};

const enhance = compose(
  withState('hasContactsPermission', 'setHasContactsPermission', false),
  withState('contacts', 'setContacts', []),
  withState('offset', 'setOffset', 0),
  withState('loading', 'setLoading', true),
  withState('firstLoading', 'setFirstLoading', true),
  withHandlers({ loadMoreContacts, loadContacts }),
  lifecycle({
    async componentWillMount() {
      const {
        setHasContactsPermission,
        loadContacts,
        setFirstLoading
      } = this.props;
      const hasPermission = await checkContactsPermission();
      setHasContactsPermission(hasPermission);
      if (hasPermission) {
        loadContacts(0);
      }
      setFirstLoading(false);
    }
  })
);

export default enhance(Home);
