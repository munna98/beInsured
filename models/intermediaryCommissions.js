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
        intermediary: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'intermediary', 
          required: true,
        }, 
        company:  {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'company', 
          required: true,
        }, 
        vehicle: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'vehicle', 
          required: true,
        },
        policyType: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'policytype', 
          required: true,
        },
        // ourplan: String,
        ourPlan: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ourplan', 
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
    intermediaryCommissionModel = mongoose.model('intermediaryCommission', intermediaryCommissionSchema);
  }
};

// Initialize the model asynchronously
initializeAgentCommissionModel().catch((error) => {
  console.error('Error initializing intermediaryCommissionModel:', error);
});

export default intermediaryCommissionModel;
