// intermediaries.js

import mongoose from 'mongoose';

let intermediaryModel;

try {
  // Check if the model has already been registered
  intermediaryModel = mongoose.model('intermediary');
} catch (error) {
  // If the model hasn't been registered, define it
  const intermediarySchema = new mongoose.Schema({
    // Define your schema fields here
    name: String,
    // ...
  });

  // Create the model
  intermediaryModel = mongoose.model('intermediary', intermediarySchema);
}

export default intermediaryModel;
