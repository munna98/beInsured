// API handler file (e.g., intermediaryHandler.js)

import intermediaryModel from "models/intermediaries";

export default async function handler(req, res) {
  const { intermediaryId } = req.query;

  if (req.method === 'PUT') {
    try { 
      const { values } = req.body;
      const { name } = values; 

      // Find the intermediary by ID and update its name
      const updatedIntermediary = await intermediaryModel.findByIdAndUpdate(
        intermediaryId,
        { name }, // Update the name field
        { new: true } // Return the updated document
      );

      if (!updatedIntermediary) {
        res.status(404).json({ message: 'Intermediary not found' });
        return;
      }

      res.status(200).json(updatedIntermediary);
    } catch (error) {
      console.error('Error updating intermediary:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Find the intermediary by ID and delete it
      const deletedIntermediary = await intermediaryModel.findByIdAndDelete(intermediaryId);

      if (!deletedIntermediary) {
        res.status(404).json({ message: 'Intermediary not found' });
        return;
      }

      res.status(204).end(); // Respond with a 204 status code (No Content)
    } catch (error) {
      console.error('Error deleting intermediary:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
