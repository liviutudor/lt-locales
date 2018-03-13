let ISO3166_1 = null;
let ISO639_1 = null;

loadData = () => {
    if (ISO3166_1 && ISO639_1) return;
    ISO3166_1 = require('./data/ISO3166_1.json');
    ISO639_1 = require('./data/ISO639_1.json');
};

parseLocale = (locale) => {
    loadData();
    let [languageCode, scriptCode, countryCode] = locale.split('-');
    if (!countryCode) {
        countryCode = scriptCode;
        scriptCode = null;
    } else {
        languageCode = `${languageCode}-${scriptCode}`;
    }
    let language;
    let country;

    if (!countryCode) {
        language = ISO639_1[languageCode];
        if (!language) {
            country = ISO3166_1[languageCode] || languageCode;
            countryCode = languageCode;
            languageCode = undefined;
        }
    } else {
        language = ISO639_1[languageCode] || languageCode;
        country = ISO3166_1[countryCode] || countryCode;
    }

    return {
        languageCode,
        language,
        countryCode,
        country,
        locale,
    };
};

compareByLangCode = (locale1, locale2) => {
    if (!locale1) return -1;
    if (!locale2) return 1;
    if (locale1.languageCode < locale2.languageCode) return -1;
    if (locale1.languageCode === locale2.languageCode) return 0;
    return 1;
};

compareByCountryCode = (locale1, locale2) => {
    if (!locale1) return -1;
    if (!locale2) return 1;
    if (locale1.countryCode < locale2.countryCode) return -1;
    if (locale1.countryCode === locale2.countryCode) return 0;
    return 1;
};


module.exports = {
    parseLocale,
    compareByLangCode,
    compareByCountryCode
};
