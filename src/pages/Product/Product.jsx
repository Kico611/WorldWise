import styles from "./Product.module.css";
import PageNav from "../../components/PageNav/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            WorldWise is your ultimate travel companion. We help you document
            and share every step of your journey, from city streets to remote
            destinations. Whether you're exploring new cultures or revisiting
            favorite spots, we’re here to make your experiences unforgettable.
          </p>
          <p>
            We believe in connecting you to the world, one adventure at a time.
            Track your travels, relive your memories, and inspire others with
            your story.
          </p>
        </div>
      </section>
    </main>
  );
}
