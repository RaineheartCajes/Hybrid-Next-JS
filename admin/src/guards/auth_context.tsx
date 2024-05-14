// "use client";

// import React, { createContext, useContext, ReactNode } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store'; 
// import { useAppDispatch } from '../redux/hooks'; 
// import { clearSession } from '../redux/slice/session'; 

// interface AuthContextType {
//   isAuthenticated: boolean;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
//   const dispatch = useAppDispatch();
//   const token = useSelector((state: RootState) => state.session.token);
//   const isAuthenticated = Boolean(token);

//   const logout = () => {
//     dispatch(clearSession());
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

