import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './firebase';

export const useUserStore = create((set) => ({
  currentUser: null,
  fetchUserStore: async (uid) => {
    if (!uid) return set({ currentUser: null })
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data() })
        console.log("Document data:", docSnap.data());
      } else {
        set({ currentUser: null })
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error)
      return set({ currentUser: null })
    }
  }
}))