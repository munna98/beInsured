// API handler file (e.g., ourplanHandler.js)

import ourplanModel from "models/ourplans";

export default async function handler(req, res) {
  const { ourplanId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { values } = req.body;
      const { name } = values;

      // Find the ourplan by ID and update its name
      const updatedOurplan = await ourplanModel.findByIdAndUpdate(
        ourplanId,
        { name }, // Update the name field
        { new: true } // Return the updated document
      );

      if (!updatedOurplan) {
        res.status(404).json({ message: 'Ourplan not found' });
        return;
      }

      res.status(200).json(updatedOurplan);
    } catch (error) {
      console.error('Error updating ourplan:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Find the ourplan by ID and delete it
      const deletedOurplan = await ourplanModel.findByIdAndDelete(ourplanId);

      if (!deletedOurplan) {
        res.status(404).json({ message: 'Ourplan not found' });
        return;
      }

      res.status(204).end(); // Respond with a 204 status code (No Content)
    } catch (error) {
      console.error('Error deleting ourplan:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
