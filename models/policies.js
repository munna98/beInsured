import mongoose from 'mongoose';

let policyModel;

const initializePolicyModel = async () => {
  try {
    // Check if the model has already been registered
    policyModel = mongoose.model('policy');
  } catch (error) {
    // If the model hasn't been registered, define it
    const policySchema = new mongoose.Schema(
      {
        date: Date,
        customerName: {
          type: String,
          required: true,
        },
        policyType:  {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'policytype', 
          required: true,
        },
        vehicleNumber: {
          type: String,
          trim:true,
          uppercase: true,
          required: true,
        },
        premium: Number,
        thirdParty: Number,
        ownDamage: Number,
        net: Number,
        company:  {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'company', 
          required: true,
        },
        intermediary:  {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'intermediary', 
          required: true,
        },
        vehicleType: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'vehicle', 
          required: true,
        },
        agentName: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'agent', 
          required: true,
        },
        agentPlan: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'agentplan', 
          required: true,
        },
        commission: Number,
        ourPlan:  {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ourplan', 
          required: true,
        },
        policyNumber: String,
        paymentMode:  {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'paymentmode', 
          required: true,
        },
        capReached: Number,
        amountRecieved: Number,
        amountToBePaid: Number,
      },
      { 
        timestamps: true,
      }
    );

    // Create the model
    policyModel = mongoose.model('policy', policySchema);
  }
};

// Initialize the model asynchronously
initializePolicyModel().catch((error) => {
  console.error('Error initializing policyModel:', error);
});

export default policyModel;
