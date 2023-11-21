import companyModel from "models/companies";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve all companies from the database
      const companies = await companyModel.find({});
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch companies', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { name } = req.body.values;

      // Create a new company using the Mongoose model
      const newCompany = new companyModel({
        name: name,
      });

      // Save the new company to the database
      const savedCompany = await newCompany.save();

      res.status(201).json(savedCompany);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create company', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
