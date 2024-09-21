import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 100000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null
});

export const saveStorage = (data: any, key: any) => {
  storage.save({
    key, // Note: Do not use underscore("_") in key!
    data
  });
}

export const loadStorage = async (key = 'fcm') => {
  try {
    const token = await storage.load({ key });
    return token;
  } catch (err: any) {
    console.log(err.message, key + ' load error');
    return {};
  }
}

export const removeStorage = async (key = 'signupMobile') => {
  storage.remove({
    key: key
  });
}