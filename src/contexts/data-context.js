import { useState, useEffect, createContext } from "react";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {


    const [intermediaryData, setIntermediaryData] = useState([  {
        id: '5e887ac47eed253091be10cb',
        name: 'HEAVY',
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
    },]);
    const [agentData, setAgentData] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [vehicleData, setVehicleData] = useState([]);
    // const [policyTypeData, setPolicyData] = useState([]);


    useEffect(() => {

        const fetchIntermediaryData = async () => {
            try {
                const response = await fetch('api/intermediaries')
                const data = await response.json()
                setIntermediaryData(data)
            } catch (error) {
                console.error('Error fetching intermediaries:', error);
            }
        };
        const fetchAgentData = async () => {
            try {
                const response = await fetch('api/agents')
                const data = await response.json()
                setAgentData(data)
            } catch (error) {
                console.error('Error fetching agents:', error);
            }
        };
        const fetchCompanyData = async () => {
            try {
                const response = await fetch('api/companies')
                const data = await response.json()
                setCompanyData(data)
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };
        const fetchVehicleData = async () => {
            try {
                const response = await fetch('api/vehicles')
                const data = await response.json()
                setVehicleData(data)
            } catch (error) {
                console.error('Error fetching Data:', error);
            }
        };
        console.log(agentData);

        fetchVehicleData();
        fetchCompanyData ();
        fetchAgentData();
        fetchIntermediaryData();
    }, []);


    return (
        <DataContext.Provider value={{ intermediaryData, agentData, companyData,vehicleData }}>
            {children}
        </DataContext.Provider >
    );
}