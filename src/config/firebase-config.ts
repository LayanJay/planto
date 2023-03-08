import rnAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import rnStorage from '@react-native-firebase/storage';

export const db = firestore;
export const auth = rnAuth;
export const storage = rnStorage;
