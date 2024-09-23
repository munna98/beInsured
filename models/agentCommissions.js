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
        agent: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'agent', 
          required: true,
        },
        vehicle: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'vehicle', 
          required: true,
        },
        company:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'company', 
          required: true,
        },
        intermediary: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'intermediary', 
          required: true,
        },
        policyType: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'policytype', 
          required: true,
        },
        agentPlan: { 
          type: mongoose.Schema.Types.ObjectId,
          ref: 'agentplan', 
          required: true,
        },
        tds: Number,
        odCommissionType: String,
        odCommission: Number,
        tpCommissionType: String, 
        tpCommission: Number,
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
