// import { createContext, useReducer, useState } from "react";
// import axiosInstance from '../api'
// // import AuthReducer from "./authReducer";



// export const AuthContext = createContext()

// export const AuthContextProvider = ({children})=>{

//   const defaultUser = {
//     // Define your default user properties
//     "data": {
//       "_id": "64edb1de3969397b9138dc02",
//       "username": "sarthak rajput",
//       "email": "sarthak123@gmail.com",
//       "password": "$2b$08$UzVE19WY7RXEELvGllIGBOSKwGpyzm6w7.FgIY3cz3Kyi2rHMser2",
//       "profilePicture": "",
//       "coverPicture": "",
//       "followers": [],
//       "followings": [
//         "64ed45bbea1ce9d606a68e32"
//       ],
//       "isAdmin": false,
//       "createdAt": "2023-08-29T08:52:46.546Z",
//       "updatedAt": "2023-09-05T08:32:43.493Z",
//       "__v": 0,
//       "desc": "ye budha mere beech mai bohot bolta hai"
//     },
//     "msg": "ok"
//     // Other user properties...
//   };
//      // Define your state variables
//   const [user, setUser] = useState(null);
 
 

//   // Define functions to update state
//   const login = async (userData) => {
//     try {
//         const res = await axiosInstance.post('/login',userData)
//         if(!res){
//             console.log("hiiiiiii")
//         }
//         setUser(res.data);
//         return res.data
       
//     } catch (error) {
//         throw error;
//     }
    
//   };

//   const logout = () => {
//     // Perform logout logic here
//     // For example, clear user data and tokens
//     // Update the user state accordingly
//     setUser(null);
//   };

//     return(
//         <AuthContext.Provider
//            value={{
//             user,
//             login,
//             logout,
           
//            }}
//         > {children}</AuthContext.Provider>
//     )
// }

import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./authReducer";

const INITIAL_STATE = {
  user:JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

  const logout = () => {
    // Clear the user data from local storage
    localStorage.removeItem("user");

    // Optionally, redirect to the login page
    navigate('/login');
  };
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        logout,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};