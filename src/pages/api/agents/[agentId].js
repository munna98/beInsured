// API handler file (e.g., agentHandler.js)

import agentModel from "models/agents";
import agentCommissionModel from "models/agentCommissions";
import policyModel from "models/policies";

export default async function handler(req, res) {
  const { agentId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { values } = req.body;
      const { firstName, lastName, email, phone, location } = values;

      // Find the agent by ID and update its name
      const updatedAgent = await agentModel.findByIdAndUpdate(
        agentId,

        { 
        firstName:firstName,
        lastName:lastName,
        email:email,
        phone:phone,
        location:location }, // Update the name field
        { new: true } // Return the updated document
      );

      if (!updatedAgent) {
        res.status(404).json({ message: 'Agent not found' });
        return;
      }

      res.status(200).json(updatedAgent);
    } catch (error) {
      console.error('Error updating agent:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Check if the agent is referenced in agentCommissionModel
      const isReferencedInCommissions = await agentCommissionModel.exists({ agent: agentId });
      const isReferencedInPolicies = await policyModel.exists({ agentName: agentId });

      const isReferenced = isReferencedInCommissions || isReferencedInPolicies

      if (isReferenced) {
        res.status(400).json({ message: 'Agent has a reference and cannot be deleted' });
        console.log(message);
        return;
      }

      // If not referenced, proceed with deletion
      const deletedAgent = await agentModel.findByIdAndDelete(agentId);

      if (!deletedAgent) {
        res.status(404).json({ message: 'Agent not found' });
        return;
      }

      res.status(204).end(); // Respond with a 204 status code (No Content)
    } catch (error) {
      console.error('Error deleting agent:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
