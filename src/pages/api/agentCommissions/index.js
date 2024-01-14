import agentCommissionModel from "models/agentCommissions";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve all agentCommissions from the database
      const agentCommissions = await agentCommissionModel.find({});
      res.status(200).json(agentCommissions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch agentCommissions', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const {agent, vehicle, company, intermediary, type, policytype, agentplan, commission, tds } = req.body.values;
      // Create a new agentCommission using the Mongoose model

      const newAgentCommission = new agentCommissionModel({
        agent: agent,
        vehicle: vehicle,
        company: company,
        intermediary: intermediary,
        type: type,
        policytype: policytype,
        agentplan: agentplan,
        commission: commission,
        tds: tds,
      });
      console.log(newAgentCommission);
      // Save the new agentCommission to the database
      const savedAgentCommission = await newAgentCommission.save();
      res.status(201).json(savedAgentCommission);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create agentCommission', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
