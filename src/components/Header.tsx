"use client";

import { useState } from "react";

// styles
import styles from "../styles/index";

// components
import { SearchForm } from "./forms/search-form";
import { Link } from "react-router-dom";

// components

const Header = () => {
  // value
  const [date] = useState(() => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formatter.format(now);
  });

  const [time] = useState(() => {
    const now = new Date();
    return `${now.getHours()} : ${now.getMinutes()}`;
  });

  return (
    <header className={` ${styles.flexBetween} z-30 w-full h-12 `}>
      <div className={`${styles.flexCenter} gap-3 `}>
        <Link className={` h-12 aspect-square `} to={"/"}>
          <img
            className=" h-full w-full object-cover"
            src="pics/Lava_logo.jpg"
            alt=""
          />
        </Link>

        <div className={`${styles.flexStart} flex-col `}>
          <h1 className="text-base font-bold">Welcome to Lava tea house</h1>
          <div
            className={`${styles.flexCenter} gap-1 text-[12px] border-muted-foreground rounded-md`}
          >
            <p>{date}</p>{" "}
            <div className=" h-1 bg-muted-foreground aspect-square rounded-full"></div>{" "}
            <p>{time}</p>
          </div>
        </div>
      </div>

      <div className={`${styles.flexCenter} gap-3`}>
        <SearchForm className=" hidden md:block" />
      </div>
    </header>
  );
};

export default Header;
