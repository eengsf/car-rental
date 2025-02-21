import { onAuthStateChanged } from 'firebase/auth';
import { getUserData } from './userController';
import { UserData } from '@/models/UserData';
import { auth } from './firebase/config';

export const monitorAuthState = (
  onUserFound: (userData: UserData) => void,
  onUserNotFound: () => void
) => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getUserData(user.uid);
      if (userDoc) {
        onUserFound(userDoc);
      } else {
        onUserNotFound();
      }
    } else {
      onUserNotFound();
    }
  });

  return unsubscribe;
};
