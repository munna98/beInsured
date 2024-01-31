// use-agent-commission.js

import { useContext } from "react";
import { DataContext } from "src/contexts/data-context";

const useAgentCommission = () => {
  const { agentCommissionData } = useContext(DataContext);

  const findAgentCommission = ({
    agent,
    vehicle,
    company,
    intermediary,
    policyType,
    agentPlan,
    net,
  }) => {
    console.log("agentCommissionData:", agentCommissionData);

    const commissionFound = agentCommissionData.find(
      (data) =>
        data.agent._id === agent &&
        data.vehicle._id === vehicle &&
        data.company._id === company &&
        data.intermediary._id === intermediary &&
        data.policyType._id === policyType &&
        data.agentPlan._id === agentPlan
    );

    console.log("Conditions:", { agent, vehicle, company, intermediary, policyType, agentPlan });
    console.log("Commission Found:", commissionFound);

    if (commissionFound && commissionFound.type === "Flat") {
      return commissionFound.commission;
    }
    if (commissionFound && commissionFound.type === "Percentage") {
      return Math.round(commissionFound.commission * net / 100);
    } else return 0;
  };

  return { findAgentCommission };
};

export default useAgentCommission;

// // use-agent-commission.js

// import { useContext, useState } from "react";
// import { DataContext } from "src/contexts/data-context";

// const useAgentCommission = () => {

//   const { agentCommissionData } = useContext(DataContext);

//   const findAgentCommission = ({ agent, vehicle, company, intermediary, policyType, agentPlan }) => {
//     const conditions = { agent, vehicle, company, intermediary, policyType, agentPlan };

//     const commissionfound = agentCommissionData.find((data) =>
//       Object.entries(conditions).every(([key, value]) => data[key] === value)
//     );

//     return commissionfound ? commissionfound.commission || 0 : 0;

//   };

//   return { findAgentCommission };
// };

// export default useAgentCommission;

// use-agent-commission.js

// import { useContext, useState } from "react";
// import { DataContext } from "src/contexts/data-context";

// const useAgentCommission = () => {
//   const { agentCommissionData } = useContext(DataContext);
//  const [calculatedCommission, setcalculatedCommission] = useState(21)
//  const [commissionfound, setcommissionfound] = useState(false)

//   const findAgentCommission = (input) => {
//     const conditions = input;

//     setcommissionfound(agentCommissionData.find((data) => data.agent === conditions.agentName));
//     console.log(conditions);
//     console.log(agentCommissionData.find((data) => data.agent === conditions.agent));
//     setcalculatedCommission(commissionfound ? commissionfound.commission || 0 : 0)
//     return calculatedCommission
//   };

//   console.log(commissionfound);
//   console.log(commissionfound ? commissionfound.commission : "no  commission found");

// };

// export default useAgentCommission;
