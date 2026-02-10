'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GaugeChartProps {
  value: number; // 0-100
  label: string;
  size?: number;
}

export function GaugeChart({ value, label, size = 200 }: GaugeChartProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  // Determine color based on value
  const getColor = (val: number) => {
    if (val >= 70) return '#22c55e'; // green-500
    if (val >= 40) return '#eab308'; // yellow-500
    return '#ef4444'; // red-500
  };

  const color = getColor(value);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
        <svg width={size} height={size / 2 + 20} className="overflow-visible">
          {/* Background arc */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <motion.path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: value / 100 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>
            {Math.round(animatedValue)}
          </span>
          <span className="text-xs tracking-wide text-zinc-500 uppercase">{label}</span>
        </div>
      </div>
    </div>
  );
}
