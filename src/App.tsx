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
        className={`block ${styles.large} absolute bottom-10 z-10 w-2/3 h-[6%]`}
        to={"/menu"}
      >
        {" "}
        <Button
          className="w-full h-full font-medium text-primary"
          variant={"outline"}
        >
          TOUCH HERE TO ORDER
        </Button>
      </Link>
    </section>
  );
}
