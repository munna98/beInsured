import { useState, createContext } from "react";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [intermediaryData, setIntermediaryData] = useState([
        {
            id: '5e887ac47eed253091be10cb',
            name: 'BIG',
        },
        {
            id: '5dfghkkjhf52hj091be10c1',
            name: 'JSK',
        },
        {
            id: '5dfgh5hg37eed2rt5sde',
            name: 'FGH',
        },
        {
            id: '5dfghghj45edf6ije10c1',
            name: 'IJK',
        },

    ]);

    return (
        <DataContext.Provider value={{ intermediaryData, setIntermediaryData }}>
            {children}
        </DataContext.Provider >
    );
}