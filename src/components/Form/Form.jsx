import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import Button from "../Button/Button";
import BackButton from "../BackButton";
import useUrlPosition from "../../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../contexts/CitiesContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom

function Form() {
  const getFlagEmoji = (countryCode) => {
    return countryCode
      .toUpperCase()
      .split("")
      .map((char) => String.fromCodePoint(0x1f1e6 - 65 + char.charCodeAt(0))) // Convert each letter to the regional indicator symbol
      .join("");
  };

  const [countryCode, setCountryCode] = useState(""); // State to store country code
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const { createCity } = useCities();

  const navigate = useNavigate(); // Initialize navigate function

  useEffect(
    function () {
      if (!lat || !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");
          setCountryCode(data.countryCode); // Set the country code from the API response
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date || !countryCode) return; // Check if countryCode is present
    const emoji = getFlagEmoji(countryCode); // Generate emoji based on countryCode
    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji, // Store the emoji in the newCity object
      position: { lat, lng },
    };
    createCity(newCity); // Pass the new city object to createCity
    navigate("/app/cities"); // Go back to the previous page after city is added
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
