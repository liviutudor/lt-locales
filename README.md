# lt-locales

Liviu Tudor's own locale library.
 
This package has been created from the need to support locales in the format: `en-US` (lots of packages already support that) as well as `zh-Hant-TW` (this is traditional Chinese spoken in Taiwan). I couldn't find really a (simple) package to just parse a locale and give me the correct ISO language code (`zh-Hant` in this case) and country code (`TW` in the above). Also, in my apps I need not just the code but the English description of the languge and country -- so I created this package.

## Usage

The main bit is the `parseLocale` function which accepts a locale string as a parameter (e.g. `ro-RO`) and returns an object containing the parsed components (language code, language description, country code, description):

```javascript
    const Locales = require('lt-locales');

    let parsed = Locales.parseLocale('en-US'); //{ languageCode: 'en', language: 'English', countryCode: 'US', country: 'United States of America', locale: 'en-US' }

    let parsed = Locales.parseLocale('zh-Hant-TW'); //{ languageCode: 'zh-Hant', language: 'Traditional Chinese', countryCode: 'TW', country: 'TAIWAN', locale: 'zh-Hant-TW' }
```

## Others

The module offers 2 other function:

* `compareByLangCode`: this is a comparator function which takes as a parameter 2 locale objects (as returned by `parseLocale`) and compares them based on the language code. For example:

```javascript
    const Locales = require('lt-locales');

    Locales.compareByLangCode({ languageCode: 'en', language: 'English', countryCode: 'US', country: 'United States of America', locale: 'en-US' }, { languageCode: 'ro', language: 'Romanian', countryCode: 'RO', country: 'ROMANIA', locale: 'ro-RO' }); // returns same as "en".localeCompare("ro") == -1
```

* `compareByCountryCode`: this is a comparator function which takes as a parameter 2 locale objects (as returned by `parseLocale`) and compares them based on the country code. For example:

```javascript
    const Locales = require('lt-locales');

    Locales.compareByLangCode({ languageCode: 'en', language: 'English', countryCode: 'US', country: 'United States of America', locale: 'en-US' }, { languageCode: 'ro', language: 'Romanian', countryCode: 'RO', country: 'ROMANIA', locale: 'ro-RO' }); // returns same as "US".localeCompare("RO") == 1
```

## Data

The code contains 2 JSON files containing all the ISO 639-1 language codes and names and ISO 3166-1 country codes and names. This is used for mapping country code to names and languages codes to language names.

Currently these are lazily-loaded (on first call to `parseLocale`) however they are loaded _synchronously_ so your first call will take a hit for loading the data. Future versions may add support for async.
 


