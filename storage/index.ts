import AsyncStorage from "@react-native-async-storage/async-storage";

// stores data under a key and data *has* to be turned to a string
export const storeData = async (key: string, value: any) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e: any) {
    console.error(e.message);
  }
};

// key to access the data, then parse the string into object
export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      //checks if there is data
      const data = JSON.parse(value);
      return data;
    }
  } catch (e: any) {
    console.error(e.message);
  }
};

export const containsKey = async (key: string) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (e: any) {
    console.error(e.message);
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e: any) {
    console.error(e.message);
  }
};
