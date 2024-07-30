import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "./utils/fetchData";

const AppContext = createContext(); // Create context

// AppProvider component to provide context values
export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]); // State to hold categories
  const [users, setUsers] = useState([]); // State to hold users

  useEffect(() => {
    const fetchCategoriesAndUsers = async () => {
      try {
        const categoriesData = await fetchData(
          "http://localhost:3000/categories"
        );
        const usersData = await fetchData("http://localhost:3000/users");

        setCategories(categoriesData); // Set categories state
        setUsers(usersData); // Set users state
      } catch (error) {
        console.error("Error fetching categories and users:", error);
      }
    };

    fetchCategoriesAndUsers();
  }, []);

  return (
    <AppContext.Provider value={{ categories, users }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext); // Hook to use context
