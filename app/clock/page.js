import styles from "../page.module.css";
import { Clock } from "@/components/Clock/Clock";

export default function ClockPage() {
  return (
  <div className={styles.main__next}>
    <Clock />
  </div>
  );
}
