// API handler file (e.g., companyHandler.js)

import companyModel from "models/companies";

export default async function handler(req, res) {
  const { companyId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { values } = req.body;
      const { name } = values;

      // Find the company by ID and update its name
      const updatedCompany = await companyModel.findByIdAndUpdate(
        companyId,
        { name }, // Update the name field
        { new: true } // Return the updated document
      );

      if (!updatedCompany) {
        res.status(404).json({ message: 'Company not found' });
        return;
      }

      res.status(200).json(updatedCompany);
    } catch (error) {
      console.error('Error updating company:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Find the company by ID and delete it
      const deletedCompany = await companyModel.findByIdAndDelete(companyId);

      if (!deletedCompany) {
        res.status(404).json({ message: 'Company not found' });
        return;
      }

      res.status(204).end(); // Respond with a 204 status code (No Content)
    } catch (error) {
      console.error('Error deleting company:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
