// paymentmodes.js

import mongoose from 'mongoose';

let paymentmodeModel;

try {
  // Check if the model has already been registered
  paymentmodeModel = mongoose.model('paymentmode');
} catch (error) {
  // If the model hasn't been registered, define it
  const paymentmodeSchema = new mongoose.Schema({
    // Define your schema fields here
    name: String,
    // ...
  });

  // Create the model
  paymentmodeModel = mongoose.model('paymentmode', paymentmodeSchema);
}

export default paymentmodeModel;
