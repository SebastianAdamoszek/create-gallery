import styles from "../page.module.css";
import { Register } from "@/components/AuthForm/Register";

export default function RegisterPage() {
  return (
    <div className={styles.main__next}>
      <Register />
    </div>
  );}
