"use client";

// styles
import { Button } from "@/components/ui/button";
import styles from "@/styles";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setProductQuantity } from "@/store/cart";
import { Minus, Plus, ShoppingBasket, SquarePen, Trash2 } from "lucide-react";

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
        {/* <Button variant={"outline"} className=" w-1/3 rounded-b-none py-6">
          Back
        </Button> */}

        <Dialog>
          <CheckoutList />

          <DialogTrigger asChild>
            <Button className=" relative w-full text-primary-foreground rounded-b-none py-6 lg:h-28 lg:text-4xl lg:gap-4">
              <ShoppingBasket className=" lg:!size-10" /> Checkout
              <span className={` w-full text-right`}>
                {getTotalPrice()}{" "}
                {products.length > 0 ? products[0].price.currency : ""}
              </span>
              <span className=" absolute -top-2 -right-2 lg:-top-6 lg:-right-6 rounded-full p-1 lg:p-3 bg-destructive text-destructive-foreground text-xs lg:text-2xl">
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
    <DialogContent
      className={`grid grid-rows-[auto,1fr,auto] flex-col p-4 h-[90%] lg:gap-10`}
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
          Is This Order Correct ?{" "}
        </DialogTitle>
      </DialogHeader>

      <div
        className={` ${styles.flexStart} flex-col gap-2 lg:gap-10 overflow-hidden `}
      >
        {/* list */}
        <div
          className={`${styles.flexStart} flex-col gap-2 lg:gap-10 w-full h-full border-y border-muted p-2 lg:py-10 overflow-y-auto`}
        >
          {products.length > 0 ? (
            products.map((product, Index) => (
              <div
                key={Index}
                className={`${styles.flexCenter} w-full border border-muted p-2 gap-4 rounded-lg bg-[#F6F8F9] `}
              >
                {/* image */}
                <div className=" w-24 min-w-24 h-24 lg:h-32 lg:min-w-32 bg-muted rounded-lg shadow ">
                  <img
                    className="w-full h-full object-cover"
                    src={product.image}
                    alt={product.title}
                  ></img>
                </div>
                {/* data */}
                <div
                  className={`grid grid-cols-[1fr,auto] w-full h-full gap-2`}
                >
                  {/* product info */}
                  <div
                    className={` grid grid-rows-[auto,1fr,auto] gap-2 w-full h-full `}
                  >
                    <h1 className={`${styles.small} lg:text-2xl font-semibold`}>
                      {product.title}
                    </h1>

                    {/* badges */}
                    <div
                      className={` ${styles.flexStart} flex-wrap gap-1 w-full ${styles.small}`}
                    >
                      <Badge
                        variant="outline"
                        size={"sm"}
                        className="font-medium lg:text-xl"
                      >
                        Mode: {product.temperature}
                      </Badge>
                      <Badge
                        variant="outline"
                        size={"sm"}
                        className="font-medium lg:text-xl"
                      >
                        Variant: {product.variantOptions.name}
                      </Badge>
                      {product.addOns
                        .filter((addOn) => addOn.selectedOption > 0) // Filter out add-ons with selectedOption <= 0
                        .map((addOn, addOnIndex) => (
                          <Badge
                            key={addOnIndex}
                            variant="outline"
                            size={"sm"}
                            className="font-medium lg:text-xl"
                          >
                            {addOn.selectedOption * addOn.price.value}{" "}
                            {addOn.name}
                          </Badge>
                        ))}

                      {product.note && (
                        <Badge variant="default" size={"sm"}>
                          Note
                        </Badge>
                      )}
                    </div>

                    <p
                      className={` flex justify-end ${styles.normal} lg:text-2xl opacity-70 font-bold text-accent `}
                    >
                      <span>{product.variantOptions.price.currency}</span>{" "}
                      {product.variantOptions.price.value}
                    </p>
                  </div>
                  {/* Quantity control */}
                  <div
                    className={`${styles.flexBetweenEnd} flex-col w-full gap-4`}
                  >
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className=" size-6 lg:size-10 rounded-full"
                    >
                      <SquarePen className=" lg:!size-5" />
                    </Button>
                    <div className="grid grid-cols-3 gap-0">
                      <Button
                        variant={"default2"}
                        size={"icon"}
                        className=" size-6 lg:size-12 rounded-full"
                        onClick={() => {
                          dispatch(
                            setProductQuantity({
                              variantId: product.cartUID,
                              change: "decrease",
                            })
                          );
                        }}
                      >
                        {product.quantity > 1 ? (
                          <Minus className=" lg:!size-5" />
                        ) : (
                          <Trash2 className=" lg:!size-5" />
                        )}
                      </Button>
                      {/* MemoizedAddOn only re-renders when addOn.selectedOption changes */}
                      <div
                        className={`${styles.small} lg:text-3xl font-semibold grid place-items-center `}
                      >
                        {product.quantity}
                      </div>
                      <Button
                        variant={"default2"}
                        size={"icon"}
                        className=" size-6 lg:size-12 rounded-full"
                        onClick={() => {
                          dispatch(
                            setProductQuantity({
                              variantId: product.cartUID,
                              change: "increase",
                            })
                          );
                        }}
                      >
                        <Plus className=" lg:!size-5" />
                      </Button>
                    </div>
                  </div>
                </div>
                {/* delete */}
              </div>
            ))
          ) : (
            <div className="grid place-content-center w-full h-full">
              <p
                className={` ${styles.Xsmall} lg:text-lg text-primary/70 w-full text-center`}
              >
                No products in this cart.
              </p>
            </div>
          )}
        </div>

        {/* price */}
        {products.length > 0 && (
          <div className="w-full shrink-0">
            <section
              className={` w-full p-1 space-y-2 rounded-lg border border-muted `}
            >
              {/* price recue */}
              <div
                className={` w-full p-2 space-y-2 lg:space-y-4 bg-sidebar rounded-md ${styles.small} lg:text-2xl font-semibold`}
              >
                <div className={` ${styles.flexBetween}`}>
                  <p>Sub Total ({products.length})</p>
                  <p>
                    {currency} {totalPrice}
                  </p>
                </div>

                <div className={` ${styles.flexBetween}`}>
                  <p>Discount</p>
                  <p>{discount}%</p>
                </div>

                <div className={` ${styles.flexBetween}`}>
                  <p>Service Tax </p>
                  <p>{currency} 10.00</p>
                </div>

                {/* separator */}
                <div
                  className={` w-full h-[1px] border-t-2 border-dashed border-muted`}
                ></div>

                <div
                  className={` ${styles.flexBetween} ${styles.small} lg:text-3xl font-bold`}
                >
                  <p>Total Payment</p>
                  <p>
                    {currency} {totalPrice + 10}
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      <DialogFooter className="grid grid-cols-[30%,1fr] gap-2 ">
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="rounded-t-none lg:h-20 lg:text-3xl lg:p-8"
          >
            Back
          </Button>
        </DialogClose>
        <Button
          variant={"default"}
          type="button"
          className=" text-primary-foreground rounded-t-none lg:h-20 lg:text-3xl lg:p-8"
        >
          Processes To Payment
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
