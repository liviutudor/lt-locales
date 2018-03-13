const Locales = require('./index.js');

describe('Locales', () => {
    it('initializes correctly', () => {
        expect(Locales).not.toBe(null);
    });

    it('parseLocale simple', () => {
        const res = Locales.parseLocale('en-US');
        expect(res).toEqual({
            country: 'UNITED STATES',
            countryCode: 'US',
            language: 'English',
            languageCode: 'en',
            locale: 'en-US'
        });
    });

    it('parseLocale chinese', () => {
        const res = Locales.parseLocale('zh-Hant-TW');
        expect(res).toEqual({
            country: 'TAIWAN, PROVINCE OF CHINA',
            countryCode: 'TW',
            language: 'Traditional Chinese',
            languageCode: 'zh-Hant',
            locale: 'zh-Hant-TW'
        });
    });

    it('parseLocale edge cases', () => {
        let res;
        res = Locales.parseLocale('ac-AB');
        expect(res).toEqual({country: 'AB', countryCode: 'AB', language: 'ac', languageCode: 'ac', locale: 'ac-AB'});

        res = Locales.parseLocale('en');
        expect(res).toEqual({language: 'English', languageCode: 'en', locale: 'en'});

        res = Locales.parseLocale('US');
        expect(res).toEqual({country: 'UNITED STATES', countryCode: 'US', locale: 'US'});

        res = Locales.parseLocale('xy');
        expect(res).toEqual({country: 'xy', countryCode: 'xy', locale: 'xy'});
    });

    it('compareLangByCode compares 2 locales based on language code', () => {
        expect(Locales.compareByLangCode(null, null)).toBe(-1);
        expect(Locales.compareByLangCode({}, null)).toBe(1);
        expect(Locales.compareByLangCode({}, {})).toBe(0);
        expect(Locales.compareByLangCode({languageCode: 'a'}, {languageCode: 'b'})).toBe(-1);
        expect(Locales.compareByLangCode({languageCode: 'b'}, {languageCode: 'a'})).toBe(1);
        expect(Locales.compareByLangCode({languageCode: 'b'}, {languageCode: 'b'})).toBe(0);
    });

    it('compareLangByCountryCode compares 2 locales based on country code', () => {
        expect(Locales.compareByCountryCode(null, null)).toBe(-1);
        expect(Locales.compareByCountryCode({}, null)).toBe(1);
        expect(Locales.compareByCountryCode({}, {})).toBe(0);
        expect(Locales.compareByCountryCode({countryCode: 'a'}, {countryCode: 'b'})).toBe(-1);
        expect(Locales.compareByCountryCode({countryCode: 'b'}, {countryCode: 'a'})).toBe(1);
        expect(Locales.compareByCountryCode({countryCode: 'b'}, {countryCode: 'b'})).toBe(0);
    });
});
