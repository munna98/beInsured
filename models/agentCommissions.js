import mongoose from 'mongoose';
import { string } from 'prop-types';

let agentCommissionModel;

const initializeAgentCommissionModel = async () => {
  try {
    // Check if the model has already been registered
    agentCommissionModel = mongoose.model('agentCommission');
  } catch (error) {
    // If the model hasn't been registered, define it
    const agentCommissionSchema = new mongoose.Schema(
      {
        agent: String,
        vehicle: String, 
        company: String,
        intermediary: String,
        type: String,
        policytype: String,
        agentplan: String,
        commission: Number,
        tds: Number,
      },
      { 
        timestamps: true,
      }
    );

    // Create the model
    agentCommissionModel = mongoose.model('agentCommission', agentCommissionSchema);
  }
};

// Initialize the model asynchronously
initializeAgentCommissionModel().catch((error) => {
  console.error('Error initializing agentCommissionModel:', error);
});

export default agentCommissionModel;
