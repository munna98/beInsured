// policytypess.js

import mongoose from 'mongoose';

let policytypeModel;

try {
  // Check if the model has already been registered
  policytypeModel = mongoose.model('policytype');
} catch (error) {
  // If the model hasn't been registered, define it
  const policytypeSchema = new mongoose.Schema({
    // Define your schema fields here
    name: String,
    // ...
  });

  // Create the model
  policytypeModel = mongoose.model('policytype', policytypeSchema);
}

export default policytypeModel;
