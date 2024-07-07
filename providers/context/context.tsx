'use client';

import { getProducts } from '@/actions/dataFetcher';
import { auth } from '@/firebase/firebase';
import api from '@/utils/axiosInstance';
import axiosInstance from '@/utils/axiosInstance';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

export type UserType = {
  uid: string;
  displayName: string;
  photoURL: string;
} | null;

export const AppContext = createContext<any | null>(null);

export function useAppContext(): any {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

function Context({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<any>([]);
  const [likedProducts, setLikedProducts] = useState<any>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [refetchProducts, setRefetchProducts] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        currentUser.getIdToken().then((idToken) => {
          localStorage.setItem('token', idToken);
          setUser({
            uid: currentUser.uid,
            displayName: currentUser.displayName as string,
            photoURL: currentUser.photoURL as string,
          });
          setLoadingUser(false);
        });
      } else {
        setUser(null);
        localStorage.removeItem('token');
        setLoadingUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const searchProducts = async () => {
    setIsSearching(true);
    const searchedProducts = await getProducts(1, 21, searchQuery);

    setProducts(searchedProducts);
    setIsSearching(false);
  };

  const searchByImage = async (imageData: File) => {
    try {
      setIsSearching(true);
      const formData = new FormData();
      formData.append('image', imageData);
      const response = await axiosInstance.post(
        '/products/image-search/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setProducts(response.data);
      setIsSearching(false);
      return {
        success: true,
        message: 'fetched',
      };
    } catch (error) {
      console.error('Error searching visually similar products:', error);
      setIsSearching(false);
      return {
        success: false,
        message: 'No matches found. Try another image.',
      };
    }
  };

  useEffect(() => {
    const getLikedProducts = async () => {
      const response = await api.get(`/user/liked-products`);
      setLikedProducts(response.data);
    };
    getLikedProducts();
  }, [refetchProducts]);

  return (
    <AppContext.Provider
      value={{
        handleLogin,
        handleLogout,
        user,
        loadingUser,
        searchQuery,
        setSearchQuery,
        searchProducts,
        products,
        setProducts,
        searchByImage,
        isSearching,
        setIsSearching,
        likedProducts,
        setRefetchProducts,
        refetchProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default Context;
