import mongoose from 'mongoose';
import { string } from 'prop-types';

let intermediaryCommissionModel;

const initializeAgentCommissionModel = async () => {
  try {
    // Check if the model has already been registered
    intermediaryCommissionModel = mongoose.model('intermediaryCommission');
  } catch (error) {
    // If the model hasn't been registered, define it
    const intermediaryCommissionSchema = new mongoose.Schema(
      {
        agent: String,
        vehicle: String,
        commission: Number,
        company: String,
        intermediary: String,
        type: String,
        tds: Number,
      },
      { 
        timestamps: true,
      }
    );

    // Create the model
    intermediaryCommissionModel = mongoose.model('intermediaryCommission', intermediaryCommissionSchema);
  }
};

// Initialize the model asynchronously
initializeAgentCommissionModel().catch((error) => {
  console.error('Error initializing intermediaryCommissionModel:', error);
});

export default intermediaryCommissionModel;
