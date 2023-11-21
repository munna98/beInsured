// API handler file (e.g., vehicleHandler.js)

import vehicleModel from "models/vehicles";

export default async function handler(req, res) {
  const { vehicleId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { values } = req.body;
      const { name } = values;

      // Find the vehicle by ID and update its name
      const updatedVehicle = await vehicleModel.findByIdAndUpdate(
        vehicleId,
        { name }, // Update the name field
        { new: true } // Return the updated document
      );

      if (!updatedVehicle) {
        res.status(404).json({ message: 'Vehicle not found' });
        return;
      }

      res.status(200).json(updatedVehicle);
    } catch (error) {
      console.error('Error updating vehicle:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Find the vehicle by ID and delete it
      const deletedVehicle = await vehicleModel.findByIdAndDelete(vehicleId);

      if (!deletedVehicle) {
        res.status(404).json({ message: 'Vehicle not found' });
        return;
      }

      res.status(204).end(); // Respond with a 204 status code (No Content)
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
