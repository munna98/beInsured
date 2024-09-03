// API handler file (e.g., policyHandler.js)

import policyModel from "models/policies";

export default async function handler(req, res) {
  const { policyId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { values } = req.body;
      const {  date,
        customerName,
        policyType,
        vehicleNumber,
        premium,
        thirdParty,
        ownDamage,
        net,
        company,
        intermediary,
        vehicleType,
        agentName,
        agentPlan,
        commission,
        ourPlan,
        policyNumber,
        paymentMode,
        paymentBy,
        capReached,
        amountRecieved,
        amountToBePaid, } = values;
        console.log(values)
      // Find the policy by ID and update its name
      const updatedAgent = await policyModel.findByIdAndUpdate(
        policyId,

        {
          date,
        customerName,
        policyType,
        vehicleNumber,
        premium,
        thirdParty,
        ownDamage,
        net,
        company,
        intermediary,
        vehicleType,
        agentName,
        agentPlan,
        commission,
        ourPlan,
        policyNumber,
        paymentMode,
        paymentBy,
        capReached,
        amountRecieved,
        amountToBePaid,
        }, // Update the fields
        { new: true } // Return the updated document

      );

      if (!updatedAgent) {
        res.status(404).json({ message: 'Agent not found' });
        return;
      }

      res.status(200).json(updatedAgent);
    } catch (error) {
      console.error('Error updating policy:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Find the policy by ID and delete it
      const deletedAgent = await policyModel.findByIdAndDelete(policyId);

      if (!deletedAgent) {
        res.status(404).json({ message: 'Agent not found' });
        return;
      }

      res.status(204).end(); // Respond with a 204 status code (No Content)
    } catch (error) {
      console.error('Error deleting policy:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
