// Uses the same styles as Product
import styles from "./Product.module.css";
import PageNav from "../../components/PageNav/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <div>
          <h2>
            Affordable pricing.
            <br />
            Only $9/month.
          </h2>
          <p>
            Experience all the features you need to enhance your travels. Enjoy
            seamless tracking, personalized adventures, and exclusive
            updates—all at a budget-friendly price. Your journey starts here!
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
