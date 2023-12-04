// ourplanmode.js

import mongoose from 'mongoose';

let ourplanModel;

try {
  // Check if the model has already been registered
  ourplanModel = mongoose.model('ourplan');
} catch (error) {
  // If the model hasn't been registered, define it
  const ourplanSchema = new mongoose.Schema({
    // Define your schema fields here
    name: String,
    // ...
  });

  // Create the model
  ourplanModel = mongoose.model('ourplan', ourplanSchema);
}

export default ourplanModel;
