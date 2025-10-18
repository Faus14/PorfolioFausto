"use client"

import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";

const AnimationLottie = ({ animationPath, width }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // ✅ OPTIMIZADO: Lazy load con Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationPath,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true, // ✅ Carga progresiva
    },
    style: {
      width: '95%',
    }
  };

  return (
    <div ref={containerRef} style={{ minHeight: '200px' }}>
      {isVisible && <Lottie {...defaultOptions} />}
    </div>
  );
};

export default AnimationLottie;