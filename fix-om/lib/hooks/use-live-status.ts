"use client";

import { useState, useEffect } from "react";

interface LiveStatusResult {
  isOpen: boolean;
  currentTime: string;
  statusText: string;
  nextOpenTime: string;
}

export function useLiveStatus(): LiveStatusResult {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const omanOffset = 4;
      const omanTime = new Date(now.getTime() + (omanOffset - now.getTimezoneOffset() / 60) * 60 * 60 * 1000);
      const hours = omanTime.getHours();
      const minutes = omanTime.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const isOpen = time >= "08:00" && time < "23:00";
  const statusText = isOpen ? "● Open Now" : "○ Closed";
  const nextOpenTime = "08:00 AM";

  return { isOpen, currentTime: time, statusText, nextOpenTime };
}