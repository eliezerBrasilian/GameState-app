import React, {createContext, useState, useEffect} from 'react';

export const AppContext = createContext({});

export default function AppProvider({children}) {
  const [isShowingModalEdit, setShowingModalEdit] = useState(false);
  return (
    <AppContext.Provider
      value={{
        isShowingModalEdit,
        setShowingModalEdit,
      }}>
      {children}
    </AppContext.Provider>
  );
}
