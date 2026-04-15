import React, {createContext, useContext, useState} from 'react';

interface TitleContextType {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const TitleContext = createContext<TitleContextType | null>(null);

export const TitleProvider = ({children}: any) => {
  const [title, setTitle] = useState('Title');
  return(
      <TitleContext.Provider value={{title, setTitle}}>
        {children}
      </TitleContext.Provider>
  )
}

export const useTitle = () => useContext(TitleContext)