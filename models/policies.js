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
        customerName: String,
        policyType: String,
        vehicleNumber: String,
        premium: Number,
        thirdParty: Number,
        ownDamage: Number,
        net: Number,
        company: String,
        intermediary: String,
        vehicleType: String,
        agentName: String,
        agentPlan: String,
        commission: Number,
        ourPlan: String,
        policyNumber: String,
        paymentMode: String,
        capReached: Number,
        amomuntRecieved: Number,
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
