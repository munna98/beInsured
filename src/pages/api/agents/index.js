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
      const { firstName, lastName, email, phone, location } = req.body.values;
      // Create a new agent using the Mongoose model
      console.log(req.body.values);
      const newAgent = new agentModel({
        firstName:firstName,
        lastName:lastName,
        email:email,
        phone:phone,
        location:location,
      });
      console.log(newAgent);
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
