// all possible country pairings (already sorted alphabetically by country name) given the options for country request parameter for News API
// first column represents country names, second column represents the corresponding 2-letter ISO 3166-1 codes
const allCountryPairings = [
  ["Afghanistan", "ar"],
  ["Australia", "au"],
  ["Austria", "at"],
  ["Belgium", "be"],
  ["Brazil", "br"],
  ["Bulgaria", "bg"],
  ["Canada", "ca"],
  ["China", "cn"],
  ["Colombia", "co"],
  ["Cuba", "cu"],
  ["Czechia", "cz"],
  ["Egypt", "eg"],
  ["France", "fr"],
  ["Germany", "de"],
  ["Greece", "gr"],
  ["Hong Kong", "hk"],
  ["Hungary", "hu"],
  ["India", "in"],
  ["Indonesia", "id"],
  ["Ireland", "ie"],
  ["Israel", "il"],
  ["Italy", "it"],
  ["Japan", "jp"],
  ["Latvia", "lv"],
  ["Lithuania", "lt"],
  ["Malaysia", "my"],
  ["Mexico", "mx"],
  ["Morocco", "ma"],
  ["Netherlands", "nl"],
  ["New Zealand", "nz"],
  ["Nigeria", "ng"],
  ["Norway", "no"],
  ["Philippines", "ph"],
  ["Poland", "pl"],
  ["Portugal", "pt"],
  ["Romania", "ro"],
  ["Russia", "ru"],
  ["Saudi Arabia", "sa"],
  ["Serbia", "rs"],
  ["Singapore", "sg"],
  ["Slovakia", "sk"],
  ["Slovenia", "si"],
  ["South Africa", "za"],
  ["South Korea", "kr"],
  ["Sweden", "se"],
  ["Switzerland", "ch"],
  ["Taiwan", "tw"],
  ["Thailand", "th"],
  ["Turkey", "tr"],
  ["Ukraine", "ua"],
  ["United Arab Emirates", "ae"],
  ["United Kingdom", "gb"],
  ["United States of America", "us"],
  ["Venezuela", "ve"],
];

// all possible country pairings expressed as a map
const fullMap = new Map(allCountryPairings);

// return the country code given the name of a country
export const getCountryCode = (countryName) => {
  return fullMap.get(countryName);
};

// capital letters
let alphabet = [];

/* create mapping from letter to a list of country pairings whose country name begins with that letter */
let map = new Map();
let index = 0; // represents index of allCountryPairings
// iterate through all capital letters
for (let i = 0; i < 26; i++) {
  let charCode = 65 + i; // ascii code for 'A' is 65, iterate through all capital letters
  let countryPairings = [];
  // in total, will only need one pass through allCountryPairings because it is already sorted
  while (index < allCountryPairings.length && allCountryPairings[index][0].charCodeAt(0) === charCode) {
    countryPairings.push(allCountryPairings[index]);
    index++;
  }
  let letter = String.fromCharCode(charCode);
  alphabet.push(letter);
  map.set(letter, new Map(countryPairings)); // country pairings becomes a map to allow for easy access to the codes
}

// return array of alphabet (capital letters only)
export const getAlphabet = () => alphabet;

// return all country pairings that begin with given letter (of type String, should be a capital letter)
export const getCountryPairings = (letter) => map.get(letter);
