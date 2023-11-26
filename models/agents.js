import mongoose from 'mongoose';

let agentModel;

const initializeAgentModel = async () => {
  try {
    // Check if the model has already been registered
    agentModel = mongoose.model('agent');
  } catch (error) {
    // If the model hasn't been registered, define it
    const agentSchema = new mongoose.Schema(
      {
        firstName: String,
        lastName: String, 
        email: String,
        phone: String,
        location: String,
      },
      { 
        timestamps: true,
      }
    );

    // Create the model
    agentModel = mongoose.model('agent', agentSchema);
  }
};

// Initialize the model asynchronously
initializeAgentModel().catch((error) => {
  console.error('Error initializing agentModel:', error);
});

export default agentModel;
