import mongoose from 'mongoose';

let paymentbyModel;

export const initializePaymentByModel = async () => {
  try {
    paymentbyModel = mongoose.model('paymentby');
    console.log('paymentbyModel already exists.');
  } catch (error) {
    console.log('Defining paymentbyModel...');
    const paymentBySchema = new mongoose.Schema(
      {
        _id: String,
        name: String,
      },
      { 
        timestamps: true,
      }
    );
    paymentbyModel = mongoose.model('paymentby', paymentBySchema);
  }

  if (!paymentbyModel) {
    console.error('paymentbyModel is not defined. Something went wrong during model initialization.');
    return;
  }

  try {
    const count = await paymentbyModel.countDocuments();
    if (count === 0) {
      const paymentByData = [
        { _id: new mongoose.Types.ObjectId(), name: "JSK" },
        { _id: new mongoose.Types.ObjectId(), name: "AGENT" },
      ];       
      await paymentbyModel.insertMany(paymentByData);
      console.log('Initial paymentBy data has been created.');
    } else {
      console.log('PaymentBy data already exists, skipping initialization.');
    }
  } catch (err) {
    console.error('Error counting documents in paymentBy collection:', err);
  }
};

// Export the paymentbyModel
export { paymentbyModel };
