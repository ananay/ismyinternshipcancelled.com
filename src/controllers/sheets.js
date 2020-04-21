const axios = require('axios');
const url = "https://sheets.googleapis.com/v4/spreadsheets/1MoVx8Df8oPFRPRgAb6xpZ9wmh_bInZaRxs2Zj_dFR7U/values/Sheet1!A2:Z999?key=AIzaSyD5mv39wz-LAC_bu9ZzleywmxGhYN9s79s";
const logo_default = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAQMAAADYVuV7AAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAACtJREFUeAFjGNTgPwjQgwOEdOHAAU05CEtpzQEBIJ+WnFH/kMmhW3obzAAAsZW+UDEMcxgAAAAASUVORK5CYII=';

let companies = [];
let err = false;

const NAME_COL = 0;
const STATUS_COL = 1;
const NOTES_COL = 2;
const SOURCE_COL = 4;
const OFFICIAL_LINK_COL = 3;
const LINKEDIN_COL = 5;
const LOGO_COL = 6;
const LOCATION_COL = 7;
const COORDS_COL = 8;
const TIMESTAMP_COL = 9;

function extractColumns(row) {
    return {
        name: row[NAME_COL] || 'unknown company',
        status: row[STATUS_COL] || 'nope',
        notes: row[NOTES_COL],
        source: row[SOURCE_COL],
        official_link: row[OFFICIAL_LINK_COL],
        linkedin: row[LINKEDIN_COL],
        logo: row[LOGO_COL] || logo_default,
        location: row[LOCATION_COL],
        coords: [
            row[COORDS_COL] && row[COORDS_COL].includes(',') ? +row[COORDS_COL].split(',')[0] : 0,
            row[COORDS_COL] && row[COORDS_COL].includes(',') ? +row[COORDS_COL].split(',')[1] : 0
        ],
        timestamp: row[TIMESTAMP_COL]
    };
}

const fetch = () => {
    return new Promise((resolve, reject) => {
        axios.get(url).then((r) => {
            companies = r.data.values.map(extractColumns);
            resolve(companies);
        }).catch((e) => {
            if (e) {
                console.error(err);
                err = e;
                reject(err);
            }
        });
    });
}

const status = () => {
    if (companies.length > 0 && !err) {
        return true;
    } else {
        return false;
    }
}

const count = () => {
    if (status) {
        let count_yes = 0;
        let count_nope = 0;
        let count_remote = 0; 
        let count_freeze = 0;
        let count_hiring = 0;

        for (let company of companies) {
            const lowerCaseStatus = company.status.toLowerCase();
            if (lowerCaseStatus == "yes") {
                count_yes++;
            } else if (lowerCaseStatus == "nope" || lowerCaseStatus == "no") {
                count_nope++;
            } else if (lowerCaseStatus == "remote") {
                count_remote++;
            } else if (lowerCaseStatus.includes("freeze")) {
                count_freeze++;
            } else if (lowerCaseStatus.includes("hiring")) {
                count_hiring++;
            }
        }
        return {
            "yes": count_yes,
            "nope": count_nope,
            "remote": count_remote,
            "freeze": count_freeze,
            "hiring": count_hiring,
        };
    } else {
        return false;
    }
}

module.exports = {
    fetch,
    status,
    count
};