"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

// styles
import styles from "../styles/index";

// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// auth

// constant

// constants

import { selectMenuToggle, setMenuToggle } from "@/store/UIConfig";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenuIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

const Header = () => {
  return (
    <header
      className={` fixed right-4 sm:left-1/2 sm:-translate-x-1/2 bottom-4 ${styles.flexCenterStart} z-30 text-primary `}
    ></header>
  );
};

export default Header;
