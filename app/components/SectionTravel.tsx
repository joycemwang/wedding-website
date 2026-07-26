import styles from "./SectionTravel.module.css";

type TravelItem = {
  title: string;
  description?: string;
  note?: string;
};

const TRAVEL_ITEMS: TravelItem[] = [
  {
    title: "By car",
    description: "Litchfield County is a 2 hour drive from NYC and a 2.5 hour drive from Boston.",
    note: "We highly recommend renting a car, as there are limited public transportation and rideshare options.",
  },
  {
    title: "By air",
    description: "For those flying in, the nearest airports are Bradley International Airport (1 hour) and NYC-area airports (2 hours).",
  },
];

export default function SectionTravel() {
  return (
    <div className={styles.list}>
      {TRAVEL_ITEMS.map((item) => (
        <div key={item.title} className={styles.item}>
          <h2 className={styles.title}>{item.title}</h2>
          {item.description && (
            <p className={styles.description}>{item.description}</p>
          )}
          {item.note && (
            <div className={styles.location}>{item.note}</div>
          )}
        </div>
      ))}
    </div>
  );
}
