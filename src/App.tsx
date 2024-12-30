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
        className={`block ${styles.large} absolute bottom-10 kiosk:bottom-56 z-10 h-16 kiosk:w-4/5 kiosk:h-40 `}
        to={"/luggage"}
      >
        {" "}
        <Button
          className={`${styles.H2} kiosk:text-6xl w-full h-full font-bold text-secondary-foreground/70 bg-secondary/40 border-secondary backdrop-blur-[12px]`}
          variant={"outline"}
        >
          TOUCH HERE TO ORDERs
        </Button>
      </Link>
    </section>
  );
}
