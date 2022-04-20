// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    NextOrObserver,
    User,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from 'firebase/firestore';

import { CartItem } from "../../store/cart/cart.types";
import { Category } from '../../store/categories/categories.types';
import { ObjectToAdd, AdditionalInformation, UserData, OrderData } from './firebase.types';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuIV3IEB2Q4JBKXwcym7z1WxPON8ZD0BM",
  authDomain: "crwn-clothing-db-2ae20.firebaseapp.com",
  projectId: "crwn-clothing-db-2ae20",
  storageBucket: "crwn-clothing-db-2ae20.appspot.com",
  messagingSenderId: "185956538161",
  appId: "1:185956538161:web:9d1d737555717d48f54210"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(app);

// USER FUNCTIONS
export const createUserDocumentFromAuth = async (
    userAuth: User, 
    additionalData={} as AdditionalInformation
):Promise<void | QueryDocumentSnapshot<UserData>>  => {
    if (!userAuth) return;

    const userRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log('error creating user', error);
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const signUserInWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signUpWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
    await signOut(auth);
}

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (userAuth) => {
          unsubscribe();
          resolve(userAuth);
        },
        reject
      );
    });
};

//PRODUCTS FUNCTIONS
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
    console.log('done!');
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category);

    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});

    // return categoryMap;
}

export const getCartItemsFromFirestore = async (userId: string): Promise<CartItem[] | []> => {
    const cartRef = doc(db, 'cart', userId);
    const cartSnapshot = await getDoc(cartRef);

    if (!cartSnapshot.exists()) {
        console.log('cartSnapshot does NOT exist!');
       return []; 
    }
    
    const cart = cartSnapshot.data();
    const cartItems = cart["cartItems"];
    return cartItems as CartItem[];
}

export const setCartItemsInFirestore = async (userId:string, cartItems: CartItem[] | []): Promise<void> => {
    const cartRef = doc(db, 'cart', userId);

    try {
        await setDoc(cartRef, {
            cartItems: cartItems,
        });
    } catch (error) {
        console.log('error setting cart items in firestore: ', error);
    }
}

export const getOrdersFromFirestore = async (userId: string): Promise<OrderData[]> => {
    const ordersRef = doc(db, 'orders', userId);
    const ordersSnapshot = await getDoc(ordersRef);

    if (!ordersSnapshot.exists()) {
        return [];
    }

    const ordersArray = ordersSnapshot.data()['orders'] as OrderData[];
    return ordersArray;
}

export const setOrdersInFirestore = async (userId: string, createdAt: string, dateString: string, total: number, confirmedOrders: CartItem[]): Promise<void> => {
    const ordersRef = doc(db, 'orders', userId);
    const ordersSnapshot = await getDoc(ordersRef);

    const uidCreator = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    const orderId = uidCreator();

    if (!ordersSnapshot.exists()) {
        try {
            await setDoc(ordersRef, {
                orders: [{id: orderId, createdAt, dateString, total, confirmedOrders}],
            });
        } catch (error) {
            console.log('error setting cart items in firestore: ', error);
        }
    } else {
        const ordersArray = ordersSnapshot.data()['orders'];
        try {
            await updateDoc(ordersRef, {
                orders: [
                    ...ordersArray,
                    {id: orderId, createdAt, dateString, total, confirmedOrders},
                ],
            });
        } catch (error) {
            console.log('error setting cart items in firestore: ', error);
        }
    }
}
