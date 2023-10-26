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
        {
            id: '6yhjkjh56fghj57kj789',
            name: 'PJK',
        },
        {
            id: 'se456yhjk93eije10c1',
            name: 'MUNNA',
        },
        {
            id: 'se456dfydfdje10c1',
            name: 'MUNNA',
        },
        {
            id: 'se456yhjk9ifytje10c1',
            name: 'MUNNA',
        },
        {
            id: 'se4hfiyje10c1',
            name: 'MUNNA',
        },
        {
            id: 'se456yhjiu46ije10f1',
            name: 'MUNNA',
        },
        {
            id: 'se456y6yhi5f46ijegc1',
            name: 'MUNNA',
        },
        {
            id: 'se456yhjkj7f46ijy1',
            name: 'MUNNA',
        },
        {
            id: 'se456yhjkgr46ije10c1',
            name: 'MUNNA',
        },
        {
            id: 'se456yhjk9i5f468iuc1',
            name: 'MUNNA',
        },
        {
            id: 'se456yhknhgf56tc1',
            name: 'MUNNA',
        },
        {
            id: 'ppok456yhknhgf56tc1',
            name: 'MUNNA11',
        },
        {
            id: '5e887ac47eed253091be10cb',
            name: 'BIG',
        },

    ]);

    return (
        <DataContext.Provider value={{ intermediaryData, setIntermediaryData }}>
            {children}
        </DataContext.Provider >
    );
}