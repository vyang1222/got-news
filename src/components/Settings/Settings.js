import React, { useState } from "react";
import { getCountryCode, getAlphabet, getCountryPairings } from "./countries.js";
// import { getLanguageCode, getLanguagePairings } from "./languages.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import uniqid from "uniqid";
import "./Settings.scss";
import styles from "./Settings.module.scss";

const alphabet = getAlphabet();

const Settings = (props) => {
  const { req, updateReq } = props;

  const [letterChoice, setLetter] = useState("");
  const [countryChoice, setCountry] = useState("United States of America"); // default country is USA
  // const [languageChoice, setLanguage] = useState("English"); // default language is English
  const selectingLetter = letterChoice.length === 0;

  // update letterChoice state upon user selection of letter, and switch over to country name
  const selectLetter = (letter) => {
    setLetter(letter);
  };

  // update languageChoice state upon user selection of choice
  // const selectLanguage = (newLanguage) => {
  //   setLanguage(newLanguage);
  //   // it's unnecessary to update req and make a new HTTP request if country has not been changed
  //   const newLanguageCode = getLanguageCode(newLanguage);
  //   if (newLanguageCode !== req.language) {
  //     // reset page to first page in the case of coming from a page !== 1
  //     updateReq({ ...req, language: newLanguageCode, page: 1 });
  //     // send user to top of the page after selection
  //     document.getElementById("articles").scrollTop = 0;
  //   }
  // };

  // update countryChoice state upon user selection of choice
  const selectCountry = (newCountry) => {
    setCountry(newCountry);
    // it's unnecessary to update req and make a new HTTP request if country has not been changed
    const newCountryCode = getCountryCode(newCountry);
    if (newCountryCode !== req.country) {
      // reset page to first page in the case of coming from a page !== 1
      updateReq({ ...req, country: newCountryCode, page: 1 });
      // send user to top of the page after selection IF not selecting
      if (req.category !== "search") {
        console.log("HERE");
        document.getElementById("articles").scrollTop = 0;
      }
    }
  };

  // go back to choosing letter
  const back = () => {
    setLetter("");
  };

  // choices user can choose from
  const choices = () => {
    if (selectingLetter) {
      // buttons for each capital letter in the alphabet
      return alphabet.map((letter) => (
        <button key={uniqid()} onClick={() => selectLetter(letter)} className={styles.letterBtn}>
          {letter}
        </button>
      ));
    }
    const filteredChoices = [...getCountryPairings(letterChoice).keys()];
    if (filteredChoices.length === 0) {
      // indicate to user that no countries start with this letter
      return (
        <div className={styles.warning}>
          no country available that starts with the letter {letterChoice} — choose again.
        </div>
      );
    }
    return getChoices(filteredChoices);
  };

  // get choices based on option
  const getChoices = (filteredChoices) => {
    const isSelected = (choice) => choice === countryChoice;
    // buttons for each choice
    return filteredChoices.map((choice) => (
      <button
        key={uniqid()}
        onClick={() => selectCountry(choice)}
        className={`${styles.choiceBtn} ${isSelected(choice) ? styles.selected : ""}`}
      >
        {choice}
      </button>
    ));
  };

  return (
    <div id="settings-container" className={styles.container}>
      <div>
        <div className={styles.title}>settings</div>
        <div className={styles.heading}>change the country</div>
        <div className={styles.advice}>{selectingLetter ? `(country starts with)` : ""}</div>
        <div className={`${styles.choicesContainer} ${selectingLetter ? "" : styles.displayRows}`}>{choices()}</div>
      </div>
      <div className={styles.bottom}>
        <button onClick={() => back()} className={`${styles.backBtn} ${selectingLetter ? styles.hide : ""}`}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className={styles.label}>current country:</div>
        <div className={styles.info}>{countryChoice}</div>
      </div>
    </div>
  );
};

export default Settings;
