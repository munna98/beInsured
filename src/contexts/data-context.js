import { useState, useEffect, createContext } from "react";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {


    const [intermediaryData, setIntermediaryData] = useState([]);
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