// styles
import styles from "@/styles";

// components

import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export function SmallFooter() {
  return (
    <footer
      className={`${styles.flexBetween} flex-col md:flex-row w-full ${styles.Xsmall} gap-2`}
    >
      <p className={` `}>© 2024 Posive. All rights reserved.</p>

      <div className={`${styles.flexStart} gap-2`}>
        <Link className=" underline" to={"#"}>
          Term & Condition
        </Link>
        <Separator orientation={"vertical"} className="shrink-0 h-4" />
        <Link className=" underline" to={"#"}>
          Privacy & Policy
        </Link>
      </div>
    </footer>
  );
}
