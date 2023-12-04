import intermediaryCommissionModel from "models/intermediaryCommissions";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve all intermediaryCommissions from the database
      const intermediaryCommissions = await intermediaryCommissionModel.find({});
      res.status(200).json(intermediaryCommissions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch intermediaryCommissions', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { agent,vehicle,commission, company, intermediary, type, tds } = req.body.values;
      // Create a new intermediaryCommission using the Mongoose model

      const newIntermediaryCommission = new intermediaryCommissionModel({
        agent: agent,
        vehicle: vehicle,
        commission: commission,
        company: company,
        intermediary: intermediary,
        type: type,
        tds: tds,
      });
      console.log(newIntermediaryCommission);
      // Save the new intermediaryCommission to the database
      const savedIntermediaryCommission = await newIntermediaryCommission.save();
      res.status(201).json(savedIntermediaryCommission);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create intermediaryCommission', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
