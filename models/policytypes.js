// import mongoose from 'mongoose';

// let policytypeModel;

// try {
//   // Check if the model has already been registered
//   policytypeModel = mongoose.model('policytype');
// } catch (error) {
//   // If the model hasn't been registered, define it
//   const policytypeSchema = new mongoose.Schema({
//     // Define your schema fields here
//     name: String,
//     // ...
//   });  

//   // Create the model
//   policytypeModel = mongoose.model('policytype', policytypeSchema);
// }

// export default policytypeModel;


import mongoose from 'mongoose';

let policytypeModel;

export const initializePolicytypeModel = async () => {
  try {
    policytypeModel = mongoose.model('policytype');
    console.log('policytypeModel already exists.');
  } catch (error) {
    console.log('Defining policytypeModel...');
    const policytypeSchema = new mongoose.Schema(
      {
        _id: String,
        name: String,
      },
      { 
        timestamps: true, 
      }
    );
    policytypeModel = mongoose.model('policytype', policytypeSchema);
  }

  if (!policytypeModel) {
    console.error('policytypeModel is not defined. Something went wrong during model initialization.');
    return;
  }

  try {
    const count = await policytypeModel.countDocuments();
    if (count === 0) {
      const policytypeData = [
        { _id: new mongoose.Types.ObjectId(), name: "TP" },
        { _id: new mongoose.Types.ObjectId(), name: "OD" },
        { _id: new mongoose.Types.ObjectId(), name: "PK" },
      ];       
      await policytypeModel.insertMany(policytypeData);
      console.log('Initial policytype data has been created.');
    } else {
      console.log('policytype data already exists, skipping initialization.');
    }
  } catch (err) {
    console.error('Error counting documents in policytype collection:', err);
  }
};

// Export the policytypeModel
export { policytypeModel };
