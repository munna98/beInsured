import React, { useState, useEffect, createContext } from "react";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [policyData, setPolicyData] = useState([]);
  const [intermediaryData, setIntermediaryData] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [ourplanData, setOurplanData] = useState([]);
  const [agentplanData, setAgentplanData] = useState([]);
  const [policyTypeData, setPolicyTypeData] = useState([]);
  const [paymentModeData, setPaymentModeData] = useState([]);
  const [paymentByData, setPaymentByData] = useState([]);
  const [agentCommissionData, setAgentCommissionData] = useState([]);
  const [intermediaryCommissionData, setIntermediaryCommissionData] = useState([]);
  const [isFetching, setIsFetching] = useState(true); // Track loading state

  const fetchData = async () => {
    try {
      const policyResponse = await fetch("api/policies");
      const policyData = await policyResponse.json();
      setPolicyData(policyData);


      const intermediaryResponse = await fetch("api/intermediaries");
      const intermediaryData = await intermediaryResponse.json();
      setIntermediaryData(intermediaryData);

      const agentResponse = await fetch("api/agents");
      const agentData = await agentResponse.json();
      setAgentData(agentData);

      const companyResponse = await fetch("api/companies");
      const companyData = await companyResponse.json();
      setCompanyData(companyData);

      const vehicleResponse = await fetch("api/vehicles");
      const vehicleData = await vehicleResponse.json();
      setVehicleData(vehicleData);

      const ourplanResponse = await fetch("api/ourplans");
      const ourplanData = await ourplanResponse.json();
      setOurplanData(ourplanData);

      const agentplanResponse = await fetch("api/agentplans");
      const agentplanData = await agentplanResponse.json();
      setAgentplanData(agentplanData);

      const policyTypeResponse = await fetch("api/policytypes");
      const policyTypeData = await policyTypeResponse.json();
      setPolicyTypeData(policyTypeData);

      const paymentModeResponse = await fetch("api/paymentmodes");
      const paymentModeData = await paymentModeResponse.json();
      setPaymentModeData(paymentModeData);

      const paymentByResponse = await fetch("api/paymentbies");
      const paymentByData = await paymentByResponse.json();
      setPaymentByData(paymentByData);

      const agentCommissionResponse = await fetch("api/agentCommissions");
      const agentCommissionData = await agentCommissionResponse.json();
      setAgentCommissionData(agentCommissionData);

      const intermediaryCommissionResponse = await fetch("/api/intermediaryCommissions"); 
      const intermediaryCommissionData = await intermediaryCommissionResponse.json();
      setIntermediaryCommissionData(intermediaryCommissionData);

      console.log(paymentByData);

      setIsFetching(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    setIsFetching(true);
    fetchData();
  };

  useEffect(() => {
    // Save policy data to local storage whenever it changes
    localStorage.setItem('policyData', JSON.stringify(policyData));
  }, [policyData]);

  return (
    <DataContext.Provider
      value={{
        policyData,
        intermediaryData,
        agentData,
        companyData,
        vehicleData,
        ourplanData,
        agentplanData,
        policyTypeData,
        paymentModeData,
        paymentByData,
        agentCommissionData,
        intermediaryCommissionData,
        isFetching,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};



