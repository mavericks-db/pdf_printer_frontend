import { useEffect, useRef, useState } from "react";
import styles from "./loadingbar.module.css";

interface LoadingBarProps {
  loading: Boolean;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ loading }) => {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setWidth((prevWidth) => {
          if (prevWidth === 100) {
            clearInterval(interval);
            return 100;
          } else {
            return prevWidth + 1;
          }
        });
      }, 100);
    }
  }, [loading]);

  return (
    <div className={`${styles.loadingBar} ${loading ? "" : styles.hidden}`}>
      <div
        ref={barRef}
        className={styles.bar}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default LoadingBar;
