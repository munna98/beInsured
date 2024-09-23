import receiptModel from "models/receipts";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve all receipts and populate the 'agent' field
      const receipts = await receiptModel.find({}).populate('agent');
      res.status(200).json(receipts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch receipts', error: error.message });
    }
  } else if (req.method === 'POST') { 
    try {
      const { agent, date, amount } = req.body;

      // Create a new receipt using the Mongoose model
      const newReceipt = new receiptModel({ 
        agent: agent,
        date: date,
        amount: amount,
      });

      // Save the new receipt to the database
      const savedReceipt = await newReceipt.save();
      
      res.status(201).json(savedReceipt);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create receipt', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
