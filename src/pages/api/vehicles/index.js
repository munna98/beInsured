import vehicleModel from "models/vehicles";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve all vehicles from the database
      const vehicles = await vehicleModel.find({});
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch vehicles', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { name } = req.body.values;

      // Check if an vehicle with the given name already exists
      const existingVehicle = await vehicleModel.findOne({ name });

      if (existingVehicle) {
        return res.status(400).json({ message: 'Vehicle with this name already exists' });
      }
      
      // Create a new vehicle using the Mongoose model
      const newVehicle = new vehicleModel({
        name: name,
      });

      // Save the new vehicle to the database
      const savedVehicle = await newVehicle.save();

      res.status(201).json(savedVehicle);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create vehicle', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
