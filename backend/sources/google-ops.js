const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');

(function() {
    api = {};
    api.sheetConfigFilePath = process.env.GOOGLE_SHEET_CONF || "configuration_gsheets.json";
    api.sheetConfig = JSON.parse(fs.readFileSync(api.sheetConfigFilePath));
    api.doc = new GoogleSpreadsheet(api.sheetConfig);
})();

module.exports = {};