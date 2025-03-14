import Spinner from "../Spinner/Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "../Message/Message";
import { useCities } from "../../contexts/CitiesContext";

function CountriesList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking a city on the map." />
    );

  // Create the countries array, ensuring the id is passed correctly
  const countries = cities.reduce((arr, city) => {
    // Check if the country already exists in the array
    if (!arr.some((el) => el.country === city.country)) {
      arr.push({ country: city.country, emoji: city.emoji, id: city.id });
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountriesList;
