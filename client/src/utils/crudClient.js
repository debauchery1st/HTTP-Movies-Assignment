import axios from "axios";

export const crudClient = function(baseURL) {
  return {
    get: function(path, cbThen, cbErr) {
      return new axios.get(`${baseURL}${path}`)
        .then(res => cbThen(res))
        .catch(err => cbErr(err));
    },
    put: function(path, cbThen, cbErr) {
      return new axios.put(`${baseURL}${path}`)
        .then(res => cbThen(res))
        .catch(err => cbErr(err));
    },
    delete: function(path, cbThen, cbErr) {
      return new axios.delete(`${baseURL}${path}`)
        .then(res => cbThen(res))
        .catch(err => cbErr(err));
    }
  };
};

// export const asyncCrud = function (callback) {
//   return new Promise((resolve) => { // don't forget to return!
//     setTimeout(() => {
//       callback(); // looks like we will need a spy
//       resolve(7);
//     }, 1000); // will this block the test for a full second??
//   });
// }

export default crudClient;
