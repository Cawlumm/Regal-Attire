
import { Provider, createContext, useEffect, useState } from "react"
import { getCategoriesAndDocuments, getUserDocument } from "../utils/firebase/firebase.utils";
import SHOP_DATA from "../shop-data";



export const CategoriesContext = createContext ({
    categoriesMap: {},
});



export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap}

    useEffect(() => {
        const getCategoriesMap = async() => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[]);

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}

