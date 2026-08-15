"use client";

import { useEffect, useState } from "react";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Wall clock for the top-left corner.
 *
 * Returns nulls on the first render so the server and the client agree — the
 * time only appears once mounted, which avoids a hydration mismatch and a
 * visible flash of the wrong hour.
 */
export function useClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return { time: null, meridiem: null, date: null, isLate: false };
  }

  const hours = now.getHours();
  const h12 = hours % 12 || 12;

  return {
    time: `${h12}:${now.getMinutes().toString().padStart(2, "0")}`,
    meridiem: hours >= 12 ? "PM" : "AM",
    date: `${DAYS[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`,
    /** After 10 PM the night is properly under way. */
    isLate: hours >= 22 || hours < 5,
  };
}
