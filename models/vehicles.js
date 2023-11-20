
import mongoose from 'mongoose';

let vehicleModel;

try {
  // Check if the model has already been registered
  vehicleModel = mongoose.model('vehicle');
} catch (error) {
  // If the model hasn't been registered, define it
  const vehicleSchema = new mongoose.Schema({
    // Define your schema fields here
    name: String,
    // ...
  });

  // Create the model
  vehicleModel = mongoose.model('vehicle', vehicleSchema);
}

export default vehicleModel;
