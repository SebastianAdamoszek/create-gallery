import styles from "../page.module.css";
import { Gallery } from "../../components/Gallery/Gallery";

export default function GalleryPage() {
  return (
    <div className={styles.main__next}>
      <Gallery />
    </div>
  );
}
