'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export default function Counter({ 
  end, 
  duration = 1.5, 
  className = "",
  suffix = "",
  prefix = ""
}: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Smooth easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutCubic * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
}
