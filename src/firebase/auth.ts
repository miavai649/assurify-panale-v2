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

    return userCredential;
  } catch (error: any) {
    if (error && error.code) {
      switch (error.code) {
        case 'auth/weak-password':
          toast.error('Password should be at least 6 characters.');
          break;
        case 'auth/email-already-in-use':
          toast.error('This email is already in use. Please try logging in.');
          break;
        case 'auth/invalid-email':
          toast.error(
            'The email address is not valid. Please check and try again.',
          );
          break;
        default:
          toast.error('Something went wrong. Please try again.');
          break;
      }
    }

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

    return userCredential;
  } catch (error: any) {
    switch (error.code) {
      case 'auth/invalid-credential':
        toast.error('Invalid Credential');
        break;

      default:
        toast.error('Something went wrong. Please try again.');
        break;
    }
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
  return result;
};
