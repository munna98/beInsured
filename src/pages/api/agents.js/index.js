import agentModel from "models/agents";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve all agents from the database
      const agents = await agentModel.find({});
      res.status(200).json(agents);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch agents', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { agent } = req.body.values;

      // Create a new agent using the Mongoose model
      const newAgent = new agentModel({
        firstName: agent.firstName,
        lastName: agent.lastName,
        email: agent.email,
        phone: agent.phone,
        state: agent.state,
        location: agent.location,
      });

      // Save the new agent to the database
      const savedAgent = await newAgent.save();

      res.status(201).json(savedAgent);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create agent', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
