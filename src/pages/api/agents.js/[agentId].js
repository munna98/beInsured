// API handler file (e.g., agentHandler.js)

import agentModel from "models/agents";

export default async function handler(req, res) {
  const { agentId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { values } = req.body;
      const { agent } = values;

      // Find the agent by ID and update its name
      const updatedAgent = await agentModel.findByIdAndUpdate(
        agentId,
        { agent }, // Update the name field
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
      // Find the agent by ID and delete it
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
