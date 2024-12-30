"use client";

import { useState, useEffect, useCallback, memo } from "react";
import styles from "../styles/index";
import { SearchForm } from "./forms/search-form";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

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

  // values
  const [date, setDate] = useState(() => dateFormatter.format(new Date()));
  const [showSearchMobile, setShowSearchMobile] = useState(false);

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
    <header
      className={` ${styles.flexStart} flex-col z-30 w-full h-fit ${
        showSearchMobile && "gap-2"
      } `}
    >
      <div className={` ${styles.flexBetween} w-full h-10 sm:h-12 kiosk:h-24`}>
        <div className={`${styles.flexCenter} gap-2 kiosk:gap-4 sm:gap-3 `}>
          <Link
            className={` h-10 sm:h-12 kiosk:h-24 aspect-square rounded-md overflow-hidden `}
            to={"/"}
          >
            <img
              className=" h-full w-full object-cover"
              src="pics/Lava_logo.jpg"
              alt="Lava Tea House Logo"
            />
          </Link>

          <div className={`${styles.flexStart} flex-col `}>
            <h1 className={`${styles.small} kiosk:text-2xl font-bold`}>
              Welcome to Lava tea house
            </h1>
            <div
              className={`${styles.flexCenter} gap-1 ${styles.Xsmall} kiosk:text-xl border-muted-foreground rounded-md`}
            >
              <p>{date}</p>
              <div className="h-1 bg-muted-foreground aspect-square rounded-full" />
              <p>{time}</p>
            </div>
          </div>
        </div>

        <div className={`${styles.flexCenter} gap-3`}>
          {showSearch && <SearchForm className="hidden md:block kiosk:w-96" />}
          {showSearch && (
            <Button
              variant={"secondary"}
              size={"icon"}
              className=" h-10 w-10 flex md:hidden"
              onClick={() => {
                setShowSearchMobile(!showSearchMobile);
              }}
            >
              {" "}
              <Search />{" "}
            </Button>
          )}
        </div>
      </div>

      <div className={` w-full `}>
        <SearchForm
          className={` ${showSearchMobile ? "p-1" : "h-0 overflow-hidden"}`}
        />
      </div>
    </header>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(Header);
