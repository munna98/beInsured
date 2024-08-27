// API handler file (e.g., agentCommissionHandler.js)

import agentCommissionModel from "models/agentCommissions";

export default async function handler(req, res) {
  const { agentCommissionId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { values } = req.body;
      const {agent, vehicle, company, intermediary, type, policyType, agentPlan, commission, tds } = values;

      // Find the agentCommission by ID and update its name
      const updatedAgentCommission = await agentCommissionModel.findByIdAndUpdate(
        agentCommissionId,

        { 
          agent: agent,
          vehicle: vehicle, 
          company: company,
          intermediary: intermediary,
          type: type,
          policyType: policyType,
          agentPlan: agentPlan,
          commission: commission,
          tds: tds, }, // Update the name field 
        { new: true } // Return the updated document
      );

      if (!updatedAgentCommission) {
        res.status(404).json({ message: 'AgentCommission not found' });
        return;
      }

      res.status(200).json(updatedAgentCommission);
    } catch (error) {
      console.error('Error updating agentCommission:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Find the agentCommission by ID and delete it
      const deletedAgentCommission = await agentCommissionModel.findByIdAndDelete(agentCommissionId);

      if (!deletedAgentCommission) {
        res.status(404).json({ message: 'AgentCommission not found' });
        return;
      }

      res.status(204).end(); // Respond with a 204 status code (No Content)
    } catch (error) {
      console.error('Error deleting agentCommission:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
