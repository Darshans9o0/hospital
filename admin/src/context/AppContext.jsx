import { createContext } from "react";

 export const AppContext = createContext()

 const AppContextProvider = (props) => {

    const currency  = '$'

    const calclateAge = (dob) => {
        const today = new Date()
        const birDate = new Date(dob)

        let age = today.getDate() - birDate.getFullYear()
        return age

    }
      // to display time datae month properly
  const months = [ "" , "JAN" , "FEB" , "MAR" , "APRIL" , "MAY" , "JUNE" , "JULY" , "AUG" , "SEP" , "OCT" , "NOV" , "DEC"]
  
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + '' + months[Number(dateArray[1])] + " " + dateArray[2]
  }

    const value = {
        calclateAge ,
        slotDateFormat ,
        currency
        
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

 }
 export default AppContextProvider