// API handler file (e.g., policytypeHandler.js)

import policytypeModel from "models/policytypes";

export default async function handler(req, res) {
  const { policytypeId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { values } = req.body;
      const { name } = values;

      // Find the policytype by ID and update its name
      const updatedPolicytype = await policytypeModel.findByIdAndUpdate(
        policytypeId,
        { name }, // Update the name field
        { new: true } // Return the updated document
      );
 
      if (!updatedPolicytype) {
        res.status(404).json({ message: 'Policytype not found' });
        return;
      }

      res.status(200).json(updatedPolicytype);
    } catch (error) {
      console.error('Error updating policytype:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Find the policytype by ID and delete it
      const deletedPolicytype = await policytypeModel.findByIdAndDelete(policytypeId);

      if (!deletedPolicytype) {
        res.status(404).json({ message: 'Policytype not found' });
        return;
      }

      res.status(204).end(); // Respond with a 204 status code (No Content)
    } catch (error) {
      console.error('Error deleting policytype:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
