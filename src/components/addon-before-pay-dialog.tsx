"use client";

// styles
import { Button } from "@/components/ui/button";
import styles from "@/styles";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// constants

// Icons

// components

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PriceSummary } from "./price-summary";
import ProductCards from "@/sections/ProductCards";
import { ArrowLeft } from "lucide-react";

interface AddonBeforePayDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const AddonBeforePayDialog: React.FC<AddonBeforePayDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  // values
  const products = useSelector((state: RootState) => state.cart.products);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className={`grid grid-rows-[auto,1fr,auto] flex-col p-4 h-[90%] kiosk:gap-8`}
      >
        <DialogHeader className=" justify-center items-center gap-2 kiosk:gap-14 pt-6">
          <div className={` size-12 kiosk:size-44 rounded-md overflow-hidden `}>
            <img
              className=" h-full w-full object-cover"
              src="pics/Lava_logo.jpg"
              alt="Lava Tea House Logo"
            />
          </div>
          <DialogTitle className={` text-center font-semibold kiosk:text-4xl`}>
            Anything To Add on ?{" "}
          </DialogTitle>
        </DialogHeader>

        <div
          className={` ${styles.flexStart} flex-col gap-2 kiosk:gap-8 border-t border-muted-foreground overflow-hidden `}
        >
          {/* menu items list */}
          <div
            className={`${styles.flexStart} flex-col gap-2 kiosk:gap-10 w-full h-full p-2 kiosk:py-10 border-b border-muted-foreground overflow-y-auto`}
          >
            {/* product cards */}

            <ProductCards
              selectedCategorie={"all menu"}
              showMenuData={false}
              centerMenuItems={true}
            />
          </div>

          {/* price here */}
          {products.length > 0 && <PriceSummary />}
        </div>

        {/* CTA */}
        <DialogFooter className="grid grid-cols-[30%,1fr] gap-2 kiosk:gap-8 ">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="rounded-t-none kiosk:h-20 kiosk:text-3xl kiosk:p-8"
            >
              <ArrowLeft className="kiosk:!size-5" />
              Back
            </Button>
          </DialogClose>
          <Button
            variant={"default"}
            type="button"
            className=" text-primary-foreground rounded-t-none kiosk:h-20 kiosk:text-3xl kiosk:p-8"
            onClick={handleSubmit}
          >
            Processes To Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddonBeforePayDialog;
