import policyModel from "models/policies";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve all policies from the database
      const policies = await policyModel.find({})
      .populate("agentName")
      .populate("vehicleType")
      .populate("company")
      .populate("intermediary")
      .populate("policyType")
      .populate("agentPlan")
      .populate("ourPlan")
      .populate("paymentMode")
      res.status(200).json(policies);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch policies', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { date,
        customerName,
        policyType,
        vehicleNumber,
        premium,
        thirdParty,
        ownDamage,
        net,
        company,
        intermediary,
        vehicleType,
        agentName,
        agentPlan,
        commission,
        ourPlan,
        policyNumber,
        paymentMode,
        capReached,
        amountRecieved,
        amountToBePaid, } = req.body.values;
      // Create a new policy using the Mongoose model
      console.log(req.body.values);
      const newPolicy = new policyModel({
        date: date,
        customerName: customerName,
        policyType: policyType,
        vehicleNumber: vehicleNumber,
        premium: premium,
        thirdParty: thirdParty,
        ownDamage: ownDamage,
        net: net,
        company: company,
        intermediary: intermediary,
        vehicleType: vehicleType,
        agentName: agentName,
        agentPlan: agentPlan,
        commission: commission,
        ourPlan: ourPlan,
        policyNumber: policyNumber,
        paymentMode: paymentMode,
        capReached: capReached,
        amountRecieved: amountRecieved,
        amountToBePaid: amountToBePaid,
      });
      console.log(newPolicy);
      // Save the new policy to the database
      const savedPolicy = await newPolicy.save();
      res.status(201).json(savedPolicy);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create policy', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
