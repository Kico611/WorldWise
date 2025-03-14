import styles from "./CountryItem.module.css";
import twemoji from "twemoji";

function CountryItem({ country }) {
  // Ensure emoji is valid before parsing
  const parsedEmoji = country.emoji
    ? twemoji.parse(country.emoji, {
        base: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/",
      })
    : "";

  return (
    <li className={styles.countryItem}>
      <span
        className={styles.emoji}
        dangerouslySetInnerHTML={{ __html: parsedEmoji }}
      />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
