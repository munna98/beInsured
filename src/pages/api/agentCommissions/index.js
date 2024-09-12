import agentCommissionModel from "models/agentCommissions";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // const agentCommissions = await agentCommissionModel.find({});
      const agentCommissions = await agentCommissionModel
        .find({})
        .populate("agent")
        .populate("vehicle")
        .populate("company")
        .populate("intermediary")
        .populate("policyType")
        .populate("agentPlan"); 
      res.status(200).json(agentCommissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agentCommissions", error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const {
        agent,
        vehicle,
        company,
        intermediary,
        type,
        policyType,
        agentPlan,
        commission,
        tds,
      } = req.body.values;

      // Check if the combination already exists
      const existingCommission = await agentCommissionModel.findOne({
        agent: { $in: agent },
        vehicle: { $in: vehicle },
        company: { $in: company },
        intermediary: { $in: intermediary },
        policyType:{ $in: policyType },
        agentPlan:{ $in: agentPlan}
      });

      if (existingCommission) {
        return res.status(409).json({ message: "This agent commission combination already exists." });
      }

      // Proceed with creating new commissions if the combination doesn't exist
      const combinations = [];
      for (const agentId of agent) {
        for (const vehicleId of vehicle) {
          for (const companyId of company) {
            for (const intermediaryId of intermediary) {
              combinations.push({
                agent: agentId,
                vehicle: vehicleId,
                company: companyId,
                intermediary: intermediaryId,
                type,
                policyType,
                agentPlan,
                commission,
                tds,
              });
            }
          }
        }
      }

      const savedAgentCommissions = await Promise.all(
        combinations.map(async (combination) => {
          const newAgentCommission = new agentCommissionModel(combination);
          return await newAgentCommission.save();
        })
      );

      res.status(201).json(savedAgentCommissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to create agentCommissions", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}