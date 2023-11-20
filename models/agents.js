
import mongoose from 'mongoose';

let agentModel;

try {
  // Check if the model has already been registered
  agentModel = mongoose.model('agent');
} catch (error) {
  // If the model hasn't been registered, define it
  const agentSchema = new mongoose.Schema({
    // Define your schema fields here
    name: String,
    // ...
  });

  // Create the model
  agentModel = mongoose.model('agent', agentSchema);
}

export default agentModel;
