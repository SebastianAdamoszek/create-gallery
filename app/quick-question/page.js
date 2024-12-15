"use client";
import { UploadModal } from "@/components/QuickQuestion/QuickQuestion";

import styles from "../page.module.css";

export default function QuickQuestionPage() {
  return (
    <div className={styles.main__next}>
      <UploadModal />
    </div>
  );
}
