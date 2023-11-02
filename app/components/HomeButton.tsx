import Link from "next/link";
import styles from "./homebutton.module.css";

export default function HomeButton() {
  return (
    <button type='button' className={styles.btn}>
      <Link href='/'>Home</Link>
    </button>
  );
}
