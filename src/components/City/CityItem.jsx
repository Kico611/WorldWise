import styles from "./CityItem.module.css";
import twemoji from "twemoji";
import { Link } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  const parsedEmoji = twemoji.parse(emoji, {
    base: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/", // Use Cloudflare CDN
  });

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span
          className={styles.emoji}
          dangerouslySetInnerHTML={{ __html: parsedEmoji }}
        />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
