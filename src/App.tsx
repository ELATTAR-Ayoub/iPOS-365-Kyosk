import { Link } from "react-router-dom";

// styles
import styles from "./styles";

import { Button } from "./components/ui/button";

const Data = {
  adURl: "vids/Ad.mp4", // Path to your video file
};

export default function Index() {
  return (
    <section className={`relative ${styles.flexCenter} w-full h-screen`}>
      <video
        id="Ad_Video"
        src={Data.adURl}
        autoPlay
        loop
        muted // Mute the video to allow autoplay
        preload="auto" // Ensure the video loads quickly
        className="w-full h-full object-cover" // Ensure the video fills the screen
      ></video>

      <Link
        className={`block ${styles.large} absolute bottom-20 z-10 `}
        to={"/luggage"}
      >
        {" "}
        <Button
          className={`${styles.H2} w-full h-full font-black py-4 px-10 sm:py-6 sm:px-12 text-secondary-foreground/70 bg-secondary/40 border-secondary backdrop-blur-[12px]`}
          variant={"outline"}
        >
          TOUCH HERE TO ORDER
        </Button>
      </Link>
    </section>
  );
}
