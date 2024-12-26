"use client";

import { useState, useEffect, useCallback, memo } from "react";
import styles from "../styles/index";
import { SearchForm } from "./forms/search-form";
import { Link } from "react-router-dom";

interface HeaderProps {
  showSearch?: boolean;
}

const Header = ({ showSearch = true }: HeaderProps) => {
  // Format date once and memoize the formatter
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const [date, setDate] = useState(() => dateFormatter.format(new Date()));

  // Memoize the time formatting function
  const formatTime = useCallback((date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours} : ${minutes}`;
  }, []);

  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      const now = new Date();
      setTime(formatTime(now));

      // Update date only if it's a new day
      const newDate = dateFormatter.format(now);
      if (newDate !== date) {
        setDate(newDate);
      }
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [date, dateFormatter, formatTime]);

  return (
    <header className={` ${styles.flexBetween} z-30 w-full h-12 `}>
      <div className={`${styles.flexCenter} gap-3 `}>
        <Link className={` h-12 aspect-square `} to={"/"}>
          <img
            className=" h-full w-full object-cover"
            src="pics/Lava_logo.jpg"
            alt="Lava Tea House Logo"
          />
        </Link>

        <div className={`${styles.flexStart} flex-col `}>
          <h1 className="text-base font-bold">Welcome to Lava tea house</h1>
          <div
            className={`${styles.flexCenter} gap-1 text-[12px] border-muted-foreground rounded-md`}
          >
            <p>{date}</p>
            <div className="h-1 bg-muted-foreground aspect-square rounded-full" />
            <p>{time}</p>
          </div>
        </div>
      </div>

      <div className={`${styles.flexCenter} gap-3`}>
        {showSearch && <SearchForm className="hidden md:block" />}
      </div>
    </header>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(Header);
