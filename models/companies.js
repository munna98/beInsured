
import mongoose from 'mongoose';

let companyModel;

try {
  // Check if the model has already been registered
  companyModel = mongoose.model('company');
} catch (error) {
  // If the model hasn't been registered, define it
  const companySchema = new mongoose.Schema({
    // Define your schema fields here
    name: String,
    // ...
  });

  // Create the model
  companyModel = mongoose.model('company', companySchema);
}

export default companyModel;
