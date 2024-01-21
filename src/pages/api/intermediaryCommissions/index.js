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
      const { intermediary, company, vehicle, type, policytype, ourplan, commission,tds  } = req.body.values;

      // Create an array of combinations
      const combinations = [];

        for (const vehicleId of vehicle) {
          for (const companyId of company) {
              combinations.push({
                intermediary,
                company: companyId,
                vehicle: vehicleId,
                type,
                policytype,
                ourplan,
                commission,
                tds,
              });
            }
      }

      // Create a new intermediaryCommission for each combination
      const savedIntermediaryCommissions = await Promise.all(
        combinations.map(async (combination) => {
          const newIntermediaryCommission = new intermediaryCommissionModel(combination);
          return await newIntermediaryCommission.save();
        })
      );

      res.status(201).json(savedIntermediaryCommissions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create intermediaryCommissions', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
