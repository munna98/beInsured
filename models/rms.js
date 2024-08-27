import mongoose from 'mongoose';

let rmModel;

const initializeRmModel = async () => {
  try {
    // Check if the model has already been registered
    rmModel = mongoose.model('rm');
  } catch (error) {
    // If the model hasn't been registered, define it
    const rmSchema = new mongoose.Schema(
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
    rmModel = mongoose.model('rm', rmSchema);
  }
};

// Initialize the model asynchronously
initializeRmModel().catch((error) => {
  console.error('Error initializing rmModel:', error);
});

export default rmModel;
