import rmModel from "models/rms";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve all rms from the database
      const rms = await rmModel.find({});
      res.status(200).json(rms);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch rms', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { firstName, lastName, email, phone, location } = req.body.values;
      // Create a new rm using the Mongoose model
      console.log(req.body.values);
      const newRm = new rmModel({
        firstName:firstName,
        lastName:lastName,
        email:email,
        phone:phone,
        location:location,
      }); 
      console.log(newRm);
      // Save the new rm to the database
      const savedRm = await newRm.save();
      res.status(201).json(savedRm);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create rm', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
