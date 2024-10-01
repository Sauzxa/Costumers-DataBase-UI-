const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Fix: Use the correct capitalization

// Define the schema
const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,        // Fix: Use 'String' (capital S)
  mobileNumber: String, // Fix: Use 'String' (capital S)
  age: String,          // Fix: Use 'String' (capital S)
  country: String,      // Fix: Use 'String' (capital S)
  gender: String        // Fix: Use 'String' (capital S)
});

// Create the model
const Customer = mongoose.model("Customer", customerSchema);

// Export the model
module.exports = Customer;
