import React, { useContext } from "react";


export  const Context = React.createContext<any>(null);

export const useAuthContext = () =>{
    return useContext(Context)
}