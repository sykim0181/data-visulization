import React from "react";
import { useInView } from "react-intersection-observer";

interface LazyComponentProps {
  children: React.ReactNode;
  threshold?: number;
  heightEstimate?: number;
}

const LazyComponent = (props: LazyComponentProps) => {
  const { children, threshold, heightEstimate } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: threshold ?? 0
  })

  return (
    <div ref={ref}>
      {inView ? (
        <>{children}</>
      ) : (
        <div style={{
          width: "100%",
          height: heightEstimate ? `${heightEstimate}px` : "300px",
          backgroundColor: "#E2E2E2",
          opacity: "0.6",
          borderRadius: "20px"
        }} />
      )}
    </div>
  );
}

export default LazyComponent;