import { PermissionsAndroid } from 'react-native';

const hasPermission = result => {
  return result === PermissionsAndroid.RESULTS.GRANTED;
};

const checkContactsPermission = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
      if (!check) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        );
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          resolve(hasPermission(result));
        }
      } else {
        resolve(true);
      }
    } catch (err) {
      console.warn(err);
      reject('Error', false);
    }
  });
};

export default checkContactsPermission;
