import { paymentbyModel, initializePaymentByModel } from "models/paymentbies";

export default async function handler(req, res) {
  // Initialize the paymentbyModel before handling the request
  await initializePaymentByModel();

  if (!paymentbyModel) {
    return res.status(500).json({ message: 'paymentbyModel is not initialized.' });
  }

  if (req.method === 'GET') {
    try {
      // Retrieve all paymentbies from the database
      const paymentbies = await paymentbyModel.find({});
      res.status(200).json(paymentbies);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch paymentbies', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
