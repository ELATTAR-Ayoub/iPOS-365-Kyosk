import Link from "next/link";

// styles
import styles from "@/styles";

// components

import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";
import { Separator } from "@/components/ui/separator";

export function SmallFooter() {
  return (
    <footer
      className={`${styles.flexBetween} flex-col md:flex-row w-full ${styles.Xsmall} gap-2`}
    >
      <p className={` `}>© 2024 Posive. All rights reserved.</p>

      <div className={`${styles.flexStart} gap-2`}>
        <Link className=" underline" href={"#"}>
          Term & Condition
        </Link>
        <Separator orientation={"vertical"} className="shrink-0 h-4" />
        <Link className=" underline" href={"#"}>
          Privacy & Policy
        </Link>
      </div>
    </footer>
  );
}
