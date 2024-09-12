import mongoose from 'mongoose';

let receiptModel;

const initializereceiptModel = async () => {
  try {
    // Check if the model has already been registered
    receiptModel = mongoose.model('receipt');
  } catch (error) {
    // If the model hasn't been registered, define it
    const receiptSchema = new mongoose.Schema(
      {
        agent: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'agent',
        },
        date: Date, 
        amount: Number,
      },
      { 
        timestamps: true,
      }
    );

    // Create the model
    receiptModel = mongoose.model('receipt', receiptSchema);
  }
};

// Initialize the model asynchronously
initializereceiptModel().catch((error) => {
  console.error('Error initializing receiptModel:', error);
});

export default receiptModel;
