import React, { useState, useEffect, createContext } from "react";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [intermediaryData, setIntermediaryData] = useState([]);
    const [agentData, setAgentData] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [vehicleData, setVehicleData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const intermediaryResponse = await fetch('api/intermediaries');
                const intermediaryData = await intermediaryResponse.json();
                setIntermediaryData(intermediaryData);

                const agentResponse = await fetch('api/agents');
                const agentData = await agentResponse.json();
                setAgentData(agentData);

                const companyResponse = await fetch('api/companies');
                const companyData = await companyResponse.json();
                setCompanyData(companyData);

                const vehicleResponse = await fetch('api/vehicles');
                const vehicleData = await vehicleResponse.json();
                setVehicleData(vehicleData);

                setIsLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ intermediaryData, agentData, companyData,vehicleData }}>
            {children}
        </DataContext.Provider >
    );
};
