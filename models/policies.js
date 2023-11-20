
import mongoose from 'mongoose';

let policyModel;

try {
  // Check if the model has already been registered
  policyModel = mongoose.model('policy');
} catch (error) {
  // If the model hasn't been registered, define it
  const policySchema = new mongoose.Schema({
    // Define your schema fields here
    name: String,
    // ...
  });

  // Create the model
  policyModel = mongoose.model('policy', policySchema);
}

export default policyModel;
