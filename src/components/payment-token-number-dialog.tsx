"use client";

// styles
import styles from "@/styles";

// constants

// Icons

// components

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PayAtCounterIcon } from "./icons/pay-at-counter-icon";

interface PaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentTokenNumberDialog: React.FC<PaymentMethodDialogProps> = ({
  isOpen,
  onClose,
}) => {
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
            Your Order Token Number
          </DialogTitle>
        </DialogHeader>

        <div
          className={` ${styles.flexBetween} flex-col gap-2 lg:gap-8 overflow-hidden `}
        >
          <div
            className={`${styles.flexCenter} flex-col w-full gap-2 lg:gap-12`}
          >
            <p
              className={` ${styles.large} text-balance font-semibold lg:text-5xl`}
            >
              Please Pay Your Order At the Counter
            </p>
            <PayAtCounterIcon className="!size-10 sm:!size-12 lg:!w-36 lg:!h-36 " />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentTokenNumberDialog;
