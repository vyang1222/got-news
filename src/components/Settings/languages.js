// // all possible language pairings (already sorted alphabetically by language name) given the options for language request parameter for News API
// // first column represents language names, second column represents the corresponding 2-letter ISO 639-1 codes
// const allLanguagePairings = [
//   ["Arabic", "ar"],
//   ["Chinese", "zh"],
//   ["Dutch", "nl"],
//   ["English", "en"],
//   ["French", "fr"],
//   ["German", "de"],
//   ["Hebrew", "he"],
//   ["Italian", "it"],
//   ["Norwegian", "no"],
//   ["Portuguese", "pt"],
//   ["Russian", "ru"],
//   ["Spanish", "es"],
//   ["Swedish", "se"],
//   ["Urdu", "ud"],
// ];

// // all possible language pairings expressed as a map
// const fullMap = new Map(allLanguagePairings);

// // return the language code given the name of a language
// export const getLanguageCode = (languageName) => {
//   return fullMap.get(languageName);
// };

// // capital letters
// let alphabet = [];

// /* create mapping from letter to a list of language pairings whose language name begins with that letter */
// let map = new Map();
// let index = 0; // represents index of allLanguagePairings
// // iterate through all capital letters
// for (let i = 0; i < 26; i++) {
//   let charCode = 65 + i; // ascii code for 'A' is 65, iterate through all capital letters
//   let languagePairings = [];
//   // in total, will only need one pass through allLanguagePairings because it is already sorted
//   while (index < allLanguagePairings.length && allLanguagePairings[index][0].charCodeAt(0) === charCode) {
//     languagePairings.push(allLanguagePairings[index]);
//     index++;
//   }
//   let letter = String.fromCharCode(charCode);
//   alphabet.push(letter);
//   map.set(letter, new Map(languagePairings)); // language pairings becomes a map to allow for easy access to the codes
// }

// // return array of alphabet (capital letters only)
// export const getAlphabet = () => alphabet;

// // return all language pairings that begin with given letter (of type String, should be a capital letter)
// export const getLanguagePairings = (letter) => map.get(letter);
