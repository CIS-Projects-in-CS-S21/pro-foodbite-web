import { useContext, createContext } from "react"; 

// authentication, resturant info  
export const UserContext = createContext(null);

export function useUserContext(){
  return useContext(UserContext); 
}