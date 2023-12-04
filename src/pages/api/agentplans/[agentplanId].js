// API handler file (e.g., agentplanHandler.js)

import agentplanModel from "models/agentplans";

export default async function handler(req, res) {
  const { agentplanId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { values } = req.body;
      const { name } = values;

      // Find the agentplan by ID and update its name
      const updatedAgentplan = await agentplanModel.findByIdAndUpdate(
        agentplanId,
        { name }, // Update the name field
        { new: true } // Return the updated document
      );

      if (!updatedAgentplan) {
        res.status(404).json({ message: 'Agentplan not found' });
        return;
      }

      res.status(200).json(updatedAgentplan);
    } catch (error) {
      console.error('Error updating agentplan:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Find the agentplan by ID and delete it
      const deletedAgentplan = await agentplanModel.findByIdAndDelete(agentplanId);

      if (!deletedAgentplan) {
        res.status(404).json({ message: 'Agentplan not found' });
        return;
      }

      res.status(204).end(); // Respond with a 204 status code (No Content)
    } catch (error) {
      console.error('Error deleting agentplan:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
