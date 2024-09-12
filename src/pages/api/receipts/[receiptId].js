import receiptModel from "models/receipts";
// import policyModel from "models/policies"; // Assuming policies might be relevant for validation

export default async function handler(req, res) {
  const { receiptId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { values } = req.body;
      const { agent, date, amount } = values;

      // Find the receipt by ID and update its details
      const updatedReceipt = await receiptModel.findByIdAndUpdate(
        receiptId,
        { 
          agent: agent,
          date: date,
          amount: amount
        }, // Update the fields
        { new: true } // Return the updated document
      );

      if (!updatedReceipt) {
        res.status(404).json({ message: 'Receipt not found' });
        return;
      }

      // Optionally populate fields (if needed)
      await updatedReceipt.populate('agent').execPopulate();

      res.status(200).json(updatedReceipt);
    } catch (error) {
      console.error('Error updating receipt:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Optionally check if the receipt is referenced elsewhere (e.g., in policies)
      // const isReferencedInPolicies = await policyModel.exists({ receipt: receiptId });

      // if (isReferencedInPolicies) {
      //   res.status(400).json({ message: 'Receipt is referenced in policies and cannot be deleted' });
      //   return;
      // }

      // If not referenced, proceed with deletion
      const deletedReceipt = await receiptModel.findByIdAndDelete(receiptId);

      if (!deletedReceipt) {
        res.status(404).json({ message: 'Receipt not found' });
        return;
      }

      res.status(204).end(); // Respond with a 204 status code (No Content)
    } catch (error) {
      console.error('Error deleting receipt:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
