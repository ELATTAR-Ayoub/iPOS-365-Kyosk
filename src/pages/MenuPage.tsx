// styles
import styles from "@/styles/index";

import Header from "@/components/Header";
import Menu from "@/sections/Menu";
import Cart from "@/sections/Cart";

export default function Index() {
  return (
    <section
      className={`relative ${styles.flexBetween} flex-col w-full h-screen ${styles.paddings} gap-4 lg:gap-7 `}
    >
      <Header></Header>
      <Menu></Menu>
      <Cart></Cart>
    </section>
  );
}
