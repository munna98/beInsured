import paymentmodeModel from "models/paymentmodes";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve all paymentmodes from the database
      const paymentmodes = await paymentmodeModel.find({});
      res.status(200).json(paymentmodes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch paymentmodes', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { name } = req.body.values;
 
      // Check if an paymentmode with the given name already exists
      const existingPaymentmode = await paymentmodeModel.findOne({ name });

      if (existingPaymentmode) {
        return res.status(400).json({ message: 'Paymentmode with this name already exists' });
      }

      // Create a new paymentmode using the Mongoose model
      const newPaymentmode = new paymentmodeModel({
        name: name,
      });

      // Save the new paymentmode to the database
      const savedPaymentmode = await newPaymentmode.save();

      res.status(201).json(savedPaymentmode);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create paymentmode', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
