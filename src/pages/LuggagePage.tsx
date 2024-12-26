// styles
import styles from "@/styles/index";

import Header from "@/components/Header";
import Luggage from "@/sections/Luggage";

export default function Index() {
  return (
    <section
      className={`relative ${styles.flexBetween} flex-col w-full h-screen ${styles.paddings} gap-4 `}
    >
      <Header showSearch={false}></Header>
      <Luggage></Luggage>
    </section>
  );
}
