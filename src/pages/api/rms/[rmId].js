// API handler file (e.g., rmHandler.js)

import rmModel from "models/rms";
import rmCommissionModel from "models/rmCommissions";
import policyModel from "models/policies";

export default async function handler(req, res) {
  const { rmId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { values } = req.body;
      const { firstName, lastName, email, phone, location } = values;

      // Find the rm by ID and update its name
      const updatedRm = await rmModel.findByIdAndUpdate(
        rmId,

        { 
        firstName:firstName,
        lastName:lastName,
        email:email,
        phone:phone,
        location:location }, // Update the name field
        { new: true } // Return the updated document
      );

      if (!updatedRm) {
        res.status(404).json({ message: 'Rm not found' });
        return;
      }

      res.status(200).json(updatedRm);
    } catch (error) {
      console.error('Error updating rm:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Check if the rm is referenced in rmCommissionModel
      const isReferencedInCommissions = await rmCommissionModel.exists({ rm: rmId });
      const isReferencedInPolicies = await policyModel.exists({ rmName: rmId });

      const isReferenced = isReferencedInCommissions || isReferencedInPolicies

      if (isReferenced) {
        res.status(400).json({ message: 'Rm has a reference and cannot be deleted' });
        console.log(message);
        return;
      }

      // If not referenced, proceed with deletion
      const deletedRm = await rmModel.findByIdAndDelete(rmId);

      if (!deletedRm) {
        res.status(404).json({ message: 'Rm not found' });
        return;
      }

      res.status(204).end(); // Respond with a 204 status code (No Content)
    } catch (error) {
      console.error('Error deleting rm:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
