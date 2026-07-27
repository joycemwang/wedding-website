import Image from "next/image";
import { withBasePath } from "../lib/basePath";
import styles from "./PhotoDuo.module.css";

export default function PhotoDuo() {
  return (
    <div className={styles.duo}>
      <div className={styles.photo}>
        <Image
          src={withBasePath("/images/stoop-photo.jpg")}
          alt="Joyce and Ryan sitting together on a brownstone stoop"
          fill
          style={{ objectFit: "cover" }}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div className={styles.photo}>
        <Image
          src={withBasePath("/images/park-bench-photo.jpg")}
          alt="Joyce and Ryan sitting together on a park bench"
          fill
          style={{ objectFit: "cover" }}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
    </div>
  );
}
