import policytypeModel from "models/policytypes";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve all policytypes from the database
      const policytypes = await policytypeModel.find({});
      res.status(200).json(policytypes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch policytypes', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { name } = req.body.values;

      // Check if an policytype with the given name already exists
      const existingPolicytypes = await policytypeModel.findOne({ name });

      if (existingPolicytypes) {
        return res.status(400).json({ message: 'Policytypes with this name already exists' });
      }

      // Create a new policytype using the Mongoose model
      const newPolicytypes = new policytypeModel({
        name: name,
      });

      // Save the new policytype to the database
      const savedPolicytypes = await newPolicytypes.save();

      res.status(201).json(savedPolicytypes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create policytype', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
