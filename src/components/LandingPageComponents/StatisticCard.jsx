"use client";
import { useState, useRef, useEffect, memo, useCallback } from "react";
import CountUp from "react-countup";

const StatisticCard = memo(({ num, title }) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);
  const cardRef = useRef(null);

  const handleIntersection = useCallback((entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    // Create observer only once
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold: 0.1,
        rootMargin: '50px', // Start animation slightly before element comes into view
      });
    }

    const currentObserver = observerRef.current;
    const currentRef = cardRef.current;

    if (currentRef) {
      currentObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        currentObserver.unobserve(currentRef);
      }
    };
  }, [handleIntersection]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col gap-2 py-6 px-2 justify-center items-center rounded-[8px] bg-[var(--Gray-200)] w-full max-w-[228px]"
      style={{
        fontFamily: "var(--fontFamily)",
      }}
    >
      <span className="text-[40px] font-extrabold leading-[52px] text-[var(--Gray-800)]">
        {isVisible && <CountUp end={num} />}+
      </span>
      <span className="text-base font-normal leading-6 text-[var(--Gray-800)] capitalize whitespace-nowrap">
        {title}
      </span>
    </div>
  );
});

StatisticCard.displayName = 'StatisticCard';

export default StatisticCard;
