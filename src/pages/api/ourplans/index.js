import ourplanModel from "models/ourplans";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve all ourplans from the database
      const ourplans = await ourplanModel.find({});
      res.status(200).json(ourplans);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch ourplans', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { name } = req.body.values;

      // Check if an ourplan with the given name already exists
      const existingOurplan = await ourplanModel.findOne({ name });

      if (existingOurplan) {
        return res.status(400).json({ message: 'Ourplan with this name already exists' });
      }

      // Create a new ourplan using the Mongoose model
      const newOurplan = new ourplanModel({
        name: name,
      });

      // Save the new ourplan to the database
      const savedOurplan = await newOurplan.save();

      res.status(201).json(savedOurplan);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create ourplan', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
