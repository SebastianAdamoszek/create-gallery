import ForAdminUserPage from "@/components/ForAdmin/ForAdminUsersPage/ForAdminUsersPage";
import styles from "../page.module.css";

export default function UsersPage() {
  return (
  <div className={styles.main__next}>
    <ForAdminUserPage />
  </div>
  );
}