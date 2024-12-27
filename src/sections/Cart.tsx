"use client";

// styles
import { Button } from "@/components/ui/button";
import styles from "@/styles";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setProductQuantity, deleteProduct } from "@/store/cart";
import { ShoppingBasket, Trash2 } from "lucide-react";

// Icons

// components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";

const Cart = () => {
  // values
  //   const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.products);

  function getTotalPrice() {
    let totalPriceValue = 0;

    // Find how much Addons add to the price
    if (products.length > 0) {
      products.forEach((product) => {
        const t = product.price.value;
        totalPriceValue = totalPriceValue + t;
      });
      // Discounts in future
    }

    return totalPriceValue.toFixed(2);
  }

  return (
    <section
      className={` fixed w-full h-fit ${styles.flexCenter} ${
        styles.xPaddings
      } bottom-0 gap-3 ${products.length == 0 && "hidden"} `}
    >
      <div
        className={` w-full md:w-2/3 ${styles.flexCenter} gap-3 bg-secondary p-2 pb-0 rounded-t-xl shadow-lg`}
      >
        <Button variant={"outline"} className=" w-1/3 rounded-b-none py-6">
          Back
        </Button>

        <Dialog>
          <CheckoutList />

          <DialogTrigger asChild>
            <Button className=" relative w-2/3 text-primary-foreground rounded-b-none py-6">
              <ShoppingBasket /> Checkout
              <span className={` w-full text-right`}>
                {getTotalPrice()}{" "}
                {products.length > 0 ? products[0].price.currency : ""}
              </span>
              <span className=" absolute -top-2 -right-2 rounded-full p-1 bg-destructive text-destructive-foreground text-xs">
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

const CheckoutList = () => {
  // values
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.products);
  const [discount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useMemo(() => {
    // Function to calculate the total price whenever products change
    let totalPriceValue = 0;

    if (products.length > 0) {
      products.forEach((product) => {
        totalPriceValue += product.price.value;
      });
    }

    // Update the state with the new total price
    setTotalPrice(totalPriceValue);
    setCurrency(products.length > 0 ? products[0].price.currency : "");
  }, [products]);

  return (
    <DialogContent className=" p-4">
      <DialogHeader className=" justify-center items-center gap-2">
        <div className={` h-12 w-12 rounded-md overflow-hidden `}>
          <img
            className=" h-full w-full object-cover"
            src="pics/Lava_logo.jpg"
            alt="Lava Tea House Logo"
          />
        </div>
        <DialogTitle className=" text-center">
          Is This Order Correct ?{" "}
        </DialogTitle>
      </DialogHeader>

      <div className={` ${styles.flexStart} flex-col gap-2 w-full h-full `}>
        {/* list */}
        <div className={` w-full h-full overflow-y-auto `}>
          {products.length > 0 ? (
            products.map((product, Index) => (
              <div
                key={Index}
                className={`${styles.flexCenter} w-full border border-muted p-2 gap-4 `}
              >
                {/* image */}
                <div className=" w-24 min-w-24 h-24 bg-muted rounded-lg shadow ">
                  <img
                    className="w-full h-full object-cover"
                    src={product.image}
                    alt={product.title}
                  ></img>
                </div>
                {/* data */}
                <div
                  className={`${styles.flexBetweenStart} flex-col w-full h-full gap-2`}
                >
                  {/* product info */}
                  <div className={` space-y-2 w-full h-full`}>
                    <h1 className={`${styles.small} font-semibold`}>
                      {product.title}
                    </h1>
                    <p className={` ${styles.small} opacity-70 font-bold `}>
                      <span className=" relative text-accent text-xs bottom-1 ">
                        $
                      </span>{" "}
                      {product.price && product.price.value}
                    </p>
                    {/* badges */}
                    <div
                      className={` space-x-1 space-y-1 gap-1 w-full ${styles.XXsmall}`}
                    >
                      <Badge variant="outline" size={"sm"}>
                        Mode: {product.temperature}
                      </Badge>
                      <Badge variant="outline" size={"sm"}>
                        Size:{" "}
                        {product.variantOptions.name.charAt(0).toUpperCase()}
                      </Badge>
                      {product.addOns.map((addon, index) => (
                        <Badge key={index} variant="outline" size={"sm"}>
                          {addon.name}: {addon.selectedOption}
                        </Badge>
                      ))}

                      {product.note && (
                        <Badge variant="default" size={"sm"}>
                          Note
                        </Badge>
                      )}
                    </div>
                  </div>
                  {/* Quantity control */}
                  <div className={`${styles.flexBetween} w-full gap-2`}>
                    <div className="grid grid-cols-3 border rounded-lg p-1 gap-0">
                      <Button
                        variant={"default2"}
                        size={"icon"}
                        className=" w-7 h-7"
                        onClick={() => {
                          dispatch(
                            setProductQuantity({
                              variantId: product.cartUID,
                              change: "decrease",
                            })
                          );
                        }}
                      >
                        -
                      </Button>
                      {/* MemoizedAddOn only re-renders when addOn.selectedOption changes */}
                      <div
                        className={`${styles.small} grid place-items-center`}
                      >
                        {product.quantity}
                      </div>
                      <Button
                        variant={"default2"}
                        size={"icon"}
                        className=" w-7 h-7"
                        onClick={() => {
                          dispatch(
                            setProductQuantity({
                              variantId: product.cartUID,
                              change: "increase",
                            })
                          );
                        }}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant={"destructive"}
                      size={"icon"}
                      onClick={() => {
                        dispatch(deleteProduct(product.cartUID)); // Pass product.id directly
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
                {/* delete */}
              </div>
            ))
          ) : (
            <div className="grid place-content-center w-full h-full">
              <p
                className={` ${styles.Xsmall} text-primary/70 w-full text-center`}
              >
                No products in this cart.
              </p>
            </div>
          )}
        </div>

        {/* price */}
        <div className="w-full shrink-0">
          <section
            className={` w-full p-1 space-y-2 bg-muted-foreground/25 rounded-lg `}
          >
            {/* price recue */}
            <div className={` w-full p-2 space-y-2 bg-sidebar rounded-md`}>
              <div className={` ${styles.flexBetween}`}>
                <p className={`${styles.small} font-semibold`}>
                  Sub Total ({products.length})
                </p>
                <p className={`${styles.small} font-semibold`}>
                  {currency} {totalPrice}
                </p>
              </div>

              <div className={` ${styles.flexBetween}`}>
                <p className={`${styles.small} font-semibold`}>Discount</p>
                <p className={`${styles.small} font-semibold`}>{discount}%</p>
              </div>

              <div className={` ${styles.flexBetween}`}>
                <p className={`${styles.small} font-semibold`}>Service Tax </p>
                <p className={`${styles.small} font-semibold`}>
                  {currency} 10.00
                </p>
              </div>

              <Separator />

              <div className={` ${styles.flexBetween}`}>
                <p className={`${styles.small} font-semibold`}>Total Payment</p>
                <p className={`${styles.small} font-semibold`}>
                  {currency} {totalPrice + 10}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <DialogFooter className="grid grid-cols-[30%,1fr] gap-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Back
          </Button>
        </DialogClose>
        <Button variant={"default"} type="button" className=" text-secondary">
          Processes To Payment
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
