import { createContext } from "react";

 export const DocterContext = createContext()

 const DocterContextProvider = (props) => {

    const value = {
        
    }
    return (
        <DocterContext.Provider value={value}>
            {props.children}
        </DocterContext.Provider>
    )

 }
 export default DocterContextProvider