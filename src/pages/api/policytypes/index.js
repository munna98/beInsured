
import { policytypeModel, initializePolicytypeModel } from "models/policytypes";

export default async function handler(req, res) {
  // Initialize the policytypeModel before handling the request
  await initializePolicytypeModel();

  if (!policytypeModel) {
    return res.status(500).json({ message: 'policytypeModel is not initialized.' });
  }

  if (req.method === 'GET') {
    try {
      // Retrieve all policytypes from the database
      const policytypes = await policytypeModel.find({});
      res.status(200).json(policytypes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch policytypes', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
 