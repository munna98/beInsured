// import mongoose from 'mongoose';

// const commissiontypeSchema = new mongoose.Schema({
//   name: String
// });

// // Create the model and insert the predefined data
// const Commissiontype = mongoose.model('commissiontype', commissiontypeSchema);

// // Define the predefined data
// const commissiontypes = [
//   { name: "Flat" },
//   { name: "Percentage" },
// ];

// // Insert the data into the collection if it doesn't exist
// Commissiontype.collection.estimatedDocumentCount({}, (err, count) => {
//   if (err) {
//     console.error(err);
//   } else if (count === 0) {
//     Commissiontype.insertMany(commissiontypes, (insertError) => {
//       if (insertError) {
//         console.error(insertError);
//       } else {
//         console.log('Commission types data inserted successfully.');
//       }
//     });
//   }
// });

// export default Commissiontype;







// import mongoose from 'mongoose';

// let commissiontypeModel;

// const initializeCommissiontypeModel = async () => {
//   try {
//     console.log('Before checking model registration');
//     // Check if the model has already been registered
//     commissiontypeModel = mongoose.model('commissiontype');
//     console.log('After checking model registration');
//   } catch (error) {
//     // If the model hasn't been registered, define it
//     console.error('Error checking model registration:', error);
//     const commissiontypeSchema = new mongoose.Schema({
//       name: String,
//     });

//     // Create the model
//     commissiontypeModel = mongoose.model('commissiontype', commissiontypeSchema);

//     // Define the predefined data
//     const commissiontypes = [
//       { name: "Flat" },
//       { name: "Percentage" },
//     ];

//     // Insert the data into the collection if it doesn't exist
//     const count = await commissiontypeModel.estimatedDocumentCount();
//     if (count === 0) {
//       await commissiontypeModel.insertMany(commissiontypes);
//       console.log('Commission types data inserted successfully.');
//     }
//   }
// };

// // Initialize the model asynchronously
// initializeCommissiontypeModel().catch((error) => {
//   console.error('Error initializing commissiontypeModel:', error);
// });

// export default commissiontypeModel;





import mongoose from 'mongoose';

let commissiontypeModel;

const initializeCommissiontypeModel = async () => {
  try {
    // Check if the model has already been registered
    commissiontypeModel = mongoose.model('commissiontype');
  } catch (error) {
    // If the model hasn't been registered, define it
    console.error('Error checking model registration:', error);

    const commissiontypeSchema = new mongoose.Schema({
      name: String,
    });

    // Create the model
    commissiontypeModel = mongoose.model('commissiontype', commissiontypeSchema);

    // Define the predefined data
    const commissiontypes = [
      { name: "Flat" },
      { name: "Percentage" },
    ];

    try {
      // Use await to handle asynchronous operations
      const count = await commissiontypeModel.estimatedDocumentCount();

      if (count === 0) {
        await commissiontypeModel.insertMany(commissiontypes);
        console.log('Commission types data inserted successfully.');
      }
    } catch (insertError) {
      console.error('Error inserting commission types data:', insertError);
    }
  }
};

// Initialize the model asynchronously
initializeCommissiontypeModel().catch((error) => {
  console.error('Error initializing commissiontypeModel:', error);
});

export default commissiontypeModel;
