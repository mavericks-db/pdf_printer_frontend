import { useEffect, useRef, useState } from "react";

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
          if (prevWidth == 100) {
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
    <div className={`loading-bar ${loading ? "" : "hidden"}`}>
      <div ref={barRef} className='bar' style={{ width: `${width}%` }}></div>
    </div>
  );
};

export default LoadingBar;
