import agentCommissionModel from "models/agentCommissions";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const agentCommissions = await agentCommissionModel.find({});
      res.status(200).json(agentCommissions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch agentCommissions', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { agent, vehicle, company, intermediary, type, policytype, agentplan, commission, tds } = req.body.values;

      // Create an array of combinations
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
                policytype,
                agentplan,
                commission,
                tds,
              });
            }
          }
        }
      }

      // Create a new agentCommission for each combination
      const savedAgentCommissions = await Promise.all(
        combinations.map(async (combination) => {
          const newAgentCommission = new agentCommissionModel(combination);
          return await newAgentCommission.save();
        })
      );

      res.status(201).json(savedAgentCommissions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create agentCommissions', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
