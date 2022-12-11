const moment = require("moment-timezone");

module.exports = function(original_console) {
  const env = process.env.NODE_ENV;
  const timestamp = moment().format()
  return {
    log: function (text) {
      original_console.log(env + ' | ', timestamp + ' | ', text);
    },
    info: function (text) {
      original_console.info(text);
    },
    warn: function (text) {
      original_console.warn(text);
    },
    error: function (text) {
       original_console.error(text);
    }
  };
};