// import mongoose from 'mongoose';

// const commissionTypeSchema = new mongoose.Schema({
//   name: String
// });

// // Create the model and insert the predefined data
// const CommissionType = mongoose.model('commissionType', commissionTypeSchema);

// // Define the predefined data
// const commissionTypes = [
//   { name: "Flat" },
//   { name: "Percentage" },
// ];

// // Insert the data into the collection if it doesn't exist
// CommissionType.collection.estimatedDocumentCount({}, (err, count) => {
//   if (err) {
//     console.error(err);
//   } else if (count === 0) {
//     CommissionType.insertMany(commissionTypes, (insertError) => {
//       if (insertError) {
//         console.error(insertError);
//       } else {
//         console.log('Commission types data inserted successfully.');
//       }
//     });
//   }
// });

// export default CommissionType;

import mongoose from 'mongoose';

let commissionTypeModel;

const initializeCommissionTypeModel = async () => {
  try {
    console.log('Before checking model registration');
    // Check if the model has already been registered
    commissionTypeModel = mongoose.model('commissionType');
    console.log('After checking model registration');
  } catch (error) {
    // If the model hasn't been registered, define it
    console.error('Error checking model registration:', error);
    const commissionTypeSchema = new mongoose.Schema({
      name: String,
    });

    // Create the model
    commissionTypeModel = mongoose.model('commissionType', commissionTypeSchema);

    // Define the predefined data
    const commissionTypes = [
      { name: "Flat" },
      { name: "Percentage" },
    ];

    // Insert the data into the collection if it doesn't exist
    const count = await commissionTypeModel.estimatedDocumentCount();
    if (count === 0) {
      await commissionTypeModel.insertMany(commissionTypes);
      console.log('Commission types data inserted successfully.');
    }
  }
};

// Initialize the model asynchronously
initializeCommissionTypeModel().catch((error) => {
  console.error('Error initializing commissionTypeModel:', error);
});

export default commissionTypeModel;
