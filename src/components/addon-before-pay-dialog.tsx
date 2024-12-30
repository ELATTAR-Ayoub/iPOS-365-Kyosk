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
        className={`grid grid-rows-[auto,1fr,auto] flex-col p-4 h-[90%] lg:gap-8`}
      >
        <DialogHeader className=" justify-center items-center gap-2 lg:gap-14 pt-6">
          <div className={` size-12 lg:size-44 rounded-md overflow-hidden `}>
            <img
              className=" h-full w-full object-cover"
              src="pics/Lava_logo.jpg"
              alt="Lava Tea House Logo"
            />
          </div>
          <DialogTitle className={` text-center font-semibold lg:text-4xl`}>
            Anything To Add on ?{" "}
          </DialogTitle>
        </DialogHeader>

        <div
          className={` ${styles.flexStart} flex-col gap-2 lg:gap-8 overflow-hidden `}
        >
          {/* menu items list */}
          <div
            className={`${styles.flexStart} flex-col gap-2 lg:gap-10 w-full h-full p-2 lg:py-10 overflow-y-auto`}
          >
            {/* product cards */}

            <ProductCards selectedCategorie={"all menu"} showMenuData={false} />
          </div>

          {/* price here */}
          {products.length > 0 && <PriceSummary />}
        </div>

        {/* CTA */}
        <DialogFooter className="grid grid-cols-[30%,1fr] gap-2 lg:gap-8 ">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="rounded-t-none lg:h-20 lg:text-3xl lg:p-8"
            >
              <ArrowLeft className="lg:!size-5" />
              Back
            </Button>
          </DialogClose>
          <Button
            variant={"default"}
            type="button"
            className=" text-primary-foreground rounded-t-none lg:h-20 lg:text-3xl lg:p-8"
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
