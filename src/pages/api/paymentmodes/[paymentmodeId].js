// API handler file (e.g., paymentmodeHandler.js)

import paymentmodeModel from "models/paymentmodes";

export default async function handler(req, res) {
  const { paymentmodeId } = req.query;

  if (req.method === 'PUT') { 
    try {
      const { values } = req.body;
      const { name } = values;

      // Find the paymentmode by ID and update its name
      const updatedPaymentmode = await paymentmodeModel.findByIdAndUpdate(
        paymentmodeId,
        { name }, // Update the name field
        { new: true } // Return the updated document
      );

      if (!updatedPaymentmode) {
        res.status(404).json({ message: 'Paymentmode not found' });
        return;
      }

      res.status(200).json(updatedPaymentmode);
    } catch (error) {
      console.error('Error updating paymentmode:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Find the paymentmode by ID and delete it
      const deletedPaymentmode = await paymentmodeModel.findByIdAndDelete(paymentmodeId);

      if (!deletedPaymentmode) {
        res.status(404).json({ message: 'Paymentmode not found' });
        return;
      }

      res.status(204).end(); // Respond with a 204 status code (No Content)
    } catch (error) {
      console.error('Error deleting paymentmode:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
