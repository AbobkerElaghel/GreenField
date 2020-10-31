const mongoose = require("mongoose");
const db = require("./dbConfig");

const jobsPending = require("./jobsPending.js");
const jobsApplication = require("./jobsApplication.js");

jobsProgressSchema = new mongoose.Schema({
  description: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  employeeEmail: { type: String, required: true, unique: true },
  providerEmail: { type: String, required: true, unique: true },
});

let JobInProgress = mongoose.model("JobInProgress", jobsProgressSchema);

module.exports.CreateJobInProgress = (obj) => {
  return new Promise((resolve, reject) => {
    let NewProgress = {};
    let employeeEmail = obj.employeeEmail;

    /**
     * so i added this new progress object to filter out the extra
     * stuff that exists in the object itself
     */
    NewProgress.employeeEmail = obj.employeeEmail;
    NewProgress.providerEmail = obj.providerEmail;
    NewProgress.price = obj.price;
    NewProgress.description = obj.description;
    NewProgress.contact = obj.contact;
    NewProgress.address = obj.address;
    let description = NewProgress.description;
    /**
     * trying to find one to make extrat layer of protection
     */
    console.log(NewProgress, "its me");
    JobInProgress.find({ employeeEmail, description }, (err, data) => {
      if (err) return reject(err);
      if (data.length === 0) {
        //if no data found create a new one
        JobInProgress.create(NewProgress, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      } else {
        resolve("exists");
      }
    });
  });
};

// module.exports.CreateJobInProgress = (obj) => {
//   return new Promise((resolve, reject) => {
//     let email = obj.email;
//     User.findOne({ email: email }, (err, data) => {
//       if (err) return reject(err);
//       if (data === null) {
//         console.log(obj);
//         User.create(obj, (err, data) => {
//           if (err) return reject(err);
//           resolve(data);
//         });
//       } else {
//         resolve("exists");
//       }
//     });
//   });
// };

module.exports.findAllJobinProg = (obj) => {
  if (obj.employeeEmail !== undefined) {
    let employeeEmail = obj.employeeEmail;
    return new Promise((resolve, reject) => {
      JobInProgress.find({ employeeEmail }, (err, data) => {
        if (err) return reject(err);
        else {
          resolve(data);
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      let providerEmail = obj.providerEmail;
      JobInProgress.find({ providerEmail }, (err, data) => {
        if (err) return reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
};

module.exports.findToDone = (description) => {
  return new Promise((resolve, reject) => {
    JobInProgress.findOne({ description: description }, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

module.exports.deletProg = (description) => {
  return JobInProgress.deleteOne({ description });
};
