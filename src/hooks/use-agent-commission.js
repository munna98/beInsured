// use-agent-commission.js

import { useContext } from "react";
import { DataContext } from "src/contexts/data-context";

const useAgentCommission = () => {
  console.log("hi");
  const { agentCommissionData } = useContext(DataContext);

  const findAgentCommission = (conditions) => {
    console.log("looking for commission");

    const commissionfound = agentCommissionData.find((data) =>
      Object.entries(conditions).every(([key, value]) => data[key] === value)
    );
    if (commissionfound){
      console.log("commission found");
    }else console.log("not found");
    // return commissionfound ? commissionfound.commission || 0 : 5;
  };

  return { findAgentCommission };
};

export default useAgentCommission;
