const axios = require("axios");

exports.handler = function (context, event, callback) {
  const url =
    "https://api.hubapi.com/contacts/v1/search/query?q=" +
    event.From +
    "&hapikey=" +
    context.HUBSPOT_API_KEY;

  axios({ url: url })
    .then(function (response) {
      const contact = response.data.contacts[0];
      const result = {
        fullName: `${contact.properties.firstname.value} ${contact.properties.lastname.value}`,
        crmid: `${contact.vid}`,
      };
      callback(null, result);
    })
    .catch(function (error) {
      callback(null, error);
    });
};
