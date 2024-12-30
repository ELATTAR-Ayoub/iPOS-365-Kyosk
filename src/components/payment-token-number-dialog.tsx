"use client";

import styles from "@/styles";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PayAtCounterIcon } from "./icons/pay-at-counter-icon";
import { RecieptPaperIcon } from "./icons/reciept-paper-icon";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetCartConfig } from "@/store/cart";

interface PaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentTokenNumberDialog: React.FC<PaymentMethodDialogProps> = ({
  isOpen,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paymentType = useSelector((state: RootState) => state.cart.paymentType);
  const orderNumber = "23"; // You might want to generate this dynamically
  const [, setCountdown] = useState(30); // Countdown timer for half 1 min

  const getMessage = () => {
    return paymentType === "counter"
      ? "Please Pay Your Order At the Counter."
      : "Thank You, Please wait for your order.";
  };

  useEffect(() => {
    if (isOpen) {
      // Start countdown when dialog is opened
      const timer = setInterval(() => {
        setCountdown((prev: number) => {
          if (prev <= 1) {
            clearInterval(timer);
            // clean cart config
            dispatch(resetCartConfig());
            // Redirect to index page
            navigate("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Cleanup timer on unmount
      return () => clearInterval(timer);
    }
  }, [isOpen, navigate, dispatch, paymentType]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          className={`grid grid-rows-[auto,1fr,auto] flex-col p-4 h-[90%] kiosk:gap-8`}
        >
          <DialogHeader className="justify-center items-center gap-2 kiosk:gap-14 pt-6">
            <div className={`size-12 kiosk:size-44 rounded-md overflow-hidden`}>
              <img
                className="h-full w-full object-cover"
                src="pics/Lava_logo.jpg"
                alt="Lava Tea House Logo"
              />
            </div>
            <DialogTitle className={`text-center font-semibold kiosk:text-4xl`}>
              Your Order Token Number
            </DialogTitle>
          </DialogHeader>

          <div
            className={`${styles.flexBetween} flex-col gap-2 kiosk:gap-8 overflow-hidden kiosk:pb-10 pt-6 kiosk:pt-16 border-t border-muted`}
          >
            <div className={`relative ${styles.flexCenterStart} w-full h-full`}>
              <div className="relative !size-[300px] sm:!size-[324px] kiosk:!w-[624px] kiosk:!h-[624px]">
                <RecieptPaperIcon className="w-full h-full" />
                <span
                  className={`absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl kiosk:text-5xl font-semibold whitespace-nowrap`}
                >
                  Your Order <span className="underline font-bold">No</span>
                </span>
                <span
                  className={`absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl kiosk:text-8xl font-semibold`}
                >
                  {orderNumber}
                </span>
              </div>
            </div>
            <div
              className={`${styles.flexCenter} flex-col w-full gap-2 kiosk:gap-12 `}
            >
              <p
                className={`${styles.large} text-balance text-center font-semibold kiosk:!text-5xl kiosk:w-1/2 kiosk:!leading-normal `}
              >
                {getMessage()}
              </p>
              {paymentType === "counter" && (
                <PayAtCounterIcon className="!size-10 sm:!size-12 kiosk:!w-48 kiosk:!h-48" />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentTokenNumberDialog;
