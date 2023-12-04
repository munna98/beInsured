import agentplanModel from "models/agentplans";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve all agentplans from the database
      const agentplans = await agentplanModel.find({});
      res.status(200).json(agentplans);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch agentplans', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { name } = req.body.values;

      // Check if an agentplan with the given name already exists
      const existingAgentplan = await agentplanModel.findOne({ name });

      if (existingAgentplan) {
        return res.status(400).json({ message: 'Agentplan with this name already exists' });
      }

      // Create a new agentplan using the Mongoose model
      const newAgentplan = new agentplanModel({
        name: name,
      });

      // Save the new agentplan to the database
      const savedAgentplan = await newAgentplan.save();

      res.status(201).json(savedAgentplan);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create agentplan', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
