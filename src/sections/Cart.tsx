"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import styles from "@/styles";
import { ShoppingBasket } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CheckoutList from "@/components/checkout-list-dialog";
import AddonBeforePayDialog from "@/components/addon-before-pay-dialog";
import PaymentMethodDialog from "@/components/payment-method-dialog";
import { setCartPriceSummary } from "@/store/cart";
import PaymentTokenNumberDialog from "@/components/payment-token-number-dialog";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.products);
  const [currency, setCurrency] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [serviceTax] = useState(0);
  const [discount] = useState(0);
  const [isAddonBeforePayDialogOpen, setIsAddonBeforePayDialogOpen] =
    useState(false);
  const [isPaymentMethodDialogOpen, setIsPaymentMethodDialogOpen] =
    useState(false);
  const [isPaymentTokenNumberDialogOpen, setIsPaymentTokenNumberDialogOpen] =
    useState(false);

  const handleAddonDialogClose = () => {
    setIsAddonBeforePayDialogOpen(false);
  };

  const handleAddonDialogSubmit = () => {
    setIsAddonBeforePayDialogOpen(false);
    setIsPaymentMethodDialogOpen(true);
  };

  const handleCheckoutSubmit = () => {
    setIsAddonBeforePayDialogOpen(true);
  };

  const handlePaymentMethodDialogClose = () => {
    setIsPaymentMethodDialogOpen(false);
  };

  const handlePaymentMethodDialogSubmit = () => {
    setIsPaymentMethodDialogOpen(false);
    setIsPaymentTokenNumberDialogOpen(true);
  };

  const handlePaymentTokenNumberDialogClose = () => {
    setIsPaymentTokenNumberDialogOpen(false);
  };

  useMemo(() => {
    let totalPriceValue = 0;

    if (products.length > 0) {
      products.forEach((product) => {
        const productTotal = product.priceWithAddons.value * product.quantity;
        totalPriceValue += productTotal;
      });
    }

    setTotalPrice(totalPriceValue);
    setCurrency(products.length > 0 ? products[0].price.currency : "");

    dispatch(
      setCartPriceSummary({
        currency: currency,
        subTotal: totalPriceValue,
        Discount: discount,
        ServiceTax: serviceTax,
        TotalPay: totalPriceValue + serviceTax - discount,
      })
    );
  }, [products, currency, discount, serviceTax, dispatch]);

  return (
    <section
      className={`fixed w-full h-fit ${styles.flexCenter} ${
        styles.xPaddings
      } bottom-0 gap-3 ${products.length == 0 && "hidden"}`}
    >
      <div
        className={`w-full md:w-2/3 lg:w-1/2 kiosk:w-2/3 ${styles.flexCenter} gap-3 bg-secondary p-2 pb-0 rounded-t-xl shadow-lg`}
      >
        <Dialog>
          <CheckoutList onClose={() => {}} onSubmit={handleCheckoutSubmit} />
          {isAddonBeforePayDialogOpen && (
            <AddonBeforePayDialog
              isOpen={isAddonBeforePayDialogOpen}
              onClose={handleAddonDialogClose}
              onSubmit={handleAddonDialogSubmit}
            />
          )}
          {isPaymentMethodDialogOpen && (
            <PaymentMethodDialog
              isOpen={isPaymentMethodDialogOpen}
              onClose={handlePaymentMethodDialogClose}
              onSubmit={handlePaymentMethodDialogSubmit}
            />
          )}
          {isPaymentTokenNumberDialogOpen && (
            <PaymentTokenNumberDialog
              isOpen={isPaymentTokenNumberDialogOpen}
              onClose={handlePaymentTokenNumberDialogClose}
            />
          )}

          <DialogTrigger asChild>
            <Button className="relative w-full text-primary-foreground rounded-b-none py-6 kiosk:h-28 kiosk:text-4xl kiosk:gap-4">
              <ShoppingBasket className="kiosk:!size-10" /> Checkout
              <span className={`w-full text-right`}>
                {totalPrice}
                {currency}
              </span>
              <span className="absolute -top-2 -right-2 kiosk:-top-6 kiosk:-right-6 rounded-full p-1 kiosk:p-3 bg-destructive text-destructive-foreground text-xs kiosk:text-2xl">
                x {products.length}
              </span>
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    </section>
  );
};

export default Cart;
