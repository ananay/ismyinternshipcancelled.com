const axios = require('axios');
const url = "https://sheets.googleapis.com/v4/spreadsheets/1MoVx8Df8oPFRPRgAb6xpZ9wmh_bInZaRxs2Zj_dFR7U/values/Sheet1!A2:Z999?key=AIzaSyD5mv39wz-LAC_bu9ZzleywmxGhYN9s79s";

let a = [];
let err = false;

const fetch = () => {
    return new Promise((resolve, reject) => {
        axios.get(url).then((r) => {
            a = r.data.values;
            resolve(a);
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
    if (a.length > 0 && !err) {
        return true;
    } else {
        return false;
    }
}

const count = () => {
    if (status) {
        let count_yes = 0;
        let count_nope = 0;
        let count_umm = 0; 
        let count_freeze = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[i][1].toLowerCase() == "yes") {
                count_yes++;
            }
            if (a[i][1].toLowerCase() == "nope" || a[i][1].toLowerCase() == "no") {
                count_nope++;
            }
            if (a[i][1].toLowerCase() == "umm" || a[i][1].toLowerCase() == "undecided" || a[i][1].toLowerCase() == "") {
                count_umm++;
            }
            if (a[i][1].toLowerCase() == "freeze" || a[i][1].toLowerCase() == "hiringfreeze") {
                count_freeze++;
            }
        }
        return {
            "yes": count_yes,
            "nope": count_nope,
            "umm": count_umm,
            "freeze": count_freeze
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