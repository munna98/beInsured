// API handler file (e.g., intermediaryCommissionHandler.js)

import intermediaryCommissionModel from "models/intermediaryCommissions";

export default async function handler(req, res) {
  const { intermediaryCommissionId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { values } = req.body;
      const {agent, vehicle, commission, company, intermediary, type, tds } = values;

      // Find the intermediaryCommission by ID and update its name
      const updatedIntermediaryCommission = await intermediaryCommissionModel.findByIdAndUpdate(
        intermediaryCommissionId,

        { 
          agent: agent,
          vehicle: vehicle,
          commission: commission,
          company: company,
          intermediary: intermediary,
          type: type,
          tds: tds, }, // Update the name field
        { new: true } // Return the updated document
      );

      if (!updatedIntermediaryCommission) {
        res.status(404).json({ message: 'IntermediaryCommission not found' });
        return;
      }

      res.status(200).json(updatedIntermediaryCommission);
    } catch (error) {
      console.error('Error updating intermediaryCommission:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Find the intermediaryCommission by ID and delete it
      const deletedIntermediaryCommission = await intermediaryCommissionModel.findByIdAndDelete(intermediaryCommissionId);

      if (!deletedIntermediaryCommission) {
        res.status(404).json({ message: 'IntermediaryCommission not found' });
        return;
      }

      res.status(204).end(); // Respond with a 204 status code (No Content)
    } catch (error) {
      console.error('Error deleting intermediaryCommission:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
