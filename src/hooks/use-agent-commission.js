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
    ownDamage,
    thirdParty,
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
    const policyFound = commissionFound?.policyType.name;
    console.log( policyFound,' policyFound');
    

    if (commissionFound) {
      switch (policyFound) {
        case "OD":
          if (commissionFound.odCommissionType === "Flat")
            return commissionFound.odCommission;
          if (commissionFound.odCommissionType === "Percentage")
            return Math.round(commissionFound.odCommission * net / 100);
          break;

        case "TP":
          if (commissionFound.tpCommissionType === "Flat")
            return commissionFound.tpCommission;
          if (commissionFound.tpCommissionType === "Percentage")
            return Math.round(commissionFound.tpCommission * net / 100);
          break;

        case "PK":
          let odCommission = 0;
          let tpCommission = 0;

          // Handle Own Damage (OD) commission
          if (commissionFound.odCommissionType === "Flat") {
            odCommission = commissionFound.odCommission;
          } else if (commissionFound.odCommissionType === "Percentage") {
            odCommission = Math.round(
              commissionFound.odCommission * ownDamage / 100
            );
          }

          // Handle Third Party (TP) commission
          if (commissionFound.tpCommissionType === "Flat") {
            tpCommission = commissionFound.tpCommission;
          } else if (commissionFound.tpCommissionType === "Percentage") {
            tpCommission = Math.round(
              commissionFound.tpCommission * thirdParty / 100
            );
          }

          // Return the sum of OD and TP commission
          return odCommission + tpCommission;

        default:
          return 0;
      }
    }else return 0;
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
