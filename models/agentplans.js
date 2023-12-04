// intermediaries.js

import mongoose from 'mongoose';

let agentplanModel;

try {
  // Check if the model has already been registered
  agentplanModel = mongoose.model('agentplan');
} catch (error) {
  // If the model hasn't been registered, define it
  const agentplanSchema = new mongoose.Schema({
    // Define your schema fields here
    name: String,
    // ...
  });

  // Create the model
  agentplanModel = mongoose.model('agentplan', agentplanSchema);
}

export default agentplanModel;
