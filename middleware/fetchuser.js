const mongoose = require("mongoose");

const fetchdata = async () => {
  try {
    const fetch_data = await mongoose.connection.db.collection("f_data");
    const result = await fetch_data.find({}).toArray();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = fetchdata;
