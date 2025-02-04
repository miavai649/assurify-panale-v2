import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';
import toast from 'react-hot-toast';

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log(
      '🚀 ~ doCreateUserWithEmailAndPassword ~ userCredential:',
      userCredential,
    );
    return userCredential.user;
  } catch (error) {
    return error;
  }
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log(
      '🚀 ~ doCreateUserWithEmailAndPassword ~ userCredential:',
      userCredential,
    );
    return userCredential.user;
  } catch (error) {
    return error;
  }
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider).catch((error) =>
    toast.error(error.message),
  );
  return result;
};

export const doSignOut = async () => {
  const result = await auth.signOut();
  console.log('🚀 ~ doSignOut ~ result:', result);
  return result;
};
