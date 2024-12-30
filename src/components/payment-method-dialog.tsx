"use client";

import { Button } from "@/components/ui/button";
import styles from "@/styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPaymentType } from "@/store/cart";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PriceSummary } from "./price-summary";
import { LinePayIcon } from "./icons/line-pay-icon";
import { ApplePayIcon } from "./icons/apple-pay-icon";
import { GooglePayIcon } from "./icons/google-pay-icon";
import { SamsungPayIcon } from "./icons/samsung-pay-icon";
import { PayAtCounterIcon } from "./icons/pay-at-counter-icon";
import { CardPaymentIcon } from "./icons/card-payment-icon";
import { ArrowLeft } from "lucide-react";

const paymentMethods = [
  {
    title: "Pay At The Counter",
    value: "counter",
    icon: (
      <PayAtCounterIcon className="!size-10 sm:!size-12 lg:!w-36 lg:!h-36" />
    ),
  },
  {
    title: "Card Payment",
    value: "card",
    icon: (
      <CardPaymentIcon className="!w-24 !h-10 sm:!w-32 sm:!h-12 lg:!w-4/5 lg:!h-36" />
    ),
  },
  {
    title: "LINE Pay",
    value: "line",
    icon: <LinePayIcon className="!size-10 sm:!size-12 lg:!w-32" />,
  },
  {
    title: "Apple Pay",
    value: "apple",
    icon: <ApplePayIcon className="!size-10 sm:!size-12 lg:!w-28" />,
  },
  {
    title: "Google Pay",
    value: "google",
    icon: <GooglePayIcon className="!size-10 sm:!size-12 lg:!w-28" />,
  },
  {
    title: "Samsung Pay",
    value: "samsung",
    icon: <SamsungPayIcon className="!size-10 sm:!size-12 lg:!w-32" />,
  },
];

interface PaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const PaymentMethodDialog: React.FC<PaymentMethodDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.products);

  const handleSubmit = (paymentType: string) => {
    dispatch(setPaymentType(paymentType));
    // Add a small delay to ensure state is updated before proceeding
    setTimeout(() => {
      onSubmit();
    }, 100);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="grid grid-rows-[auto,1fr,auto] flex-col p-4 h-[90%] lg:gap-8">
        <DialogHeader className="justify-center items-center gap-2 lg:gap-14 pt-6">
          <div className="size-12 lg:size-44 rounded-md overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="pics/Lava_logo.jpg"
              alt="Lava Tea House Logo"
            />
          </div>
          <DialogTitle className="text-center font-semibold lg:text-4xl">
            Payment Process
          </DialogTitle>
        </DialogHeader>
        <div
          className={`${styles.flexStart} flex-col gap-2 lg:gap-8 overflow-hidden lg:pb-10 pt-6 lg:pt-16 border-t border-muted`}
        >
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 grid-rows-[100px,100px] lg:grid-rows-[250px,170px] lg:place-content-center gap-2 lg:gap-y-28 lg:gap-x-10 w-full h-full p-2 lg:py-10 overflow-y-auto`}
          >
            {paymentMethods.map((method, index) => (
              <Button
                key={method.title}
                variant="outline"
                onClick={() => handleSubmit(method.value)}
                className={`flex-col h-full lg:text-3xl lg:font-semibold lg:gap-8 ${
                  index < 2 ? "col-span-2" : ""
                }`}
              >
                {method.icon}
                {method.title}
              </Button>
            ))}
          </div>
          {products.length > 0 && <PriceSummary />}
        </div>
        <DialogFooter className="grid grid-cols-[30%,1fr] gap-2 lg:gap-8">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;
