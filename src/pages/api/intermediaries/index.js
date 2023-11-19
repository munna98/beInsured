import intermediaryModel from "models/intermediaries";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve all intermediaries from the database
      const intermediaries = await intermediaryModel.find({});
      res.status(200).json(intermediaries);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch intermediaries', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { name } = req.body.values;

      // Create a new intermediary using the Mongoose model
      const newIntermediary = new intermediaryModel({
        name: name,
      });

      // Save the new intermediary to the database
      const savedIntermediary = await newIntermediary.save();

      res.status(201).json(savedIntermediary);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create intermediary', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
