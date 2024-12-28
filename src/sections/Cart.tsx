"use client";

import { useMemo, useState } from "react";

// styles
import { Button } from "@/components/ui/button";
import styles from "@/styles";
import { Minus, Plus, ShoppingBasket, SquarePen, Trash2 } from "lucide-react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setProductQuantity } from "@/store/cart";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CartProduct } from "@/constants/interfaces";
import { products as allProducts } from "@/constants/index";
import ProductCustomizationDialog from "@/components/product-customization-dialog";

const Cart = () => {
  // values
  //   const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.products);
  const [currency, setCurrency] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useMemo(() => {
    let totalPriceValue = 0;

    if (products.length > 0) {
      products.forEach((product) => {
        // Adjust price calculation to consider quantity and priceWithAddons
        const productTotal = product.priceWithAddons.value * product.quantity;
        totalPriceValue += productTotal;
      });
    }

    // Update the state with the new total price
    setTotalPrice(totalPriceValue);
    setCurrency(products.length > 0 ? products[0].price.currency : "");
  }, [products]); // Re-run whenever the products array changes

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
                {totalPrice}
                {currency}
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
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<CartProduct>();
  const [productToEdit, setProductToEdit] = useState<CartProduct>({
    id: "",
    cartUID: "",
    image: "",
    title: "",
    description: "",
    variantOptions: {
      name: "",
      price: { value: 0, currency: "USD" },
    },
    temperature: "",
    icePercentage: {
      name: "",
      type: "percentage",
      options: [],
      selectedOption: "",
    },
    addOns: [],
    nonpaidAddons: [],
    isAvailable: false,
    customisable: false,
    categories: [],
    note: "",
    quantity: 0,
    tumbler: false,
    price: { value: 0, currency: "USD" },
    priceWithAddons: { value: 0, currency: "USD" },
  });

  useMemo(() => {
    let totalPriceValue = 0;

    if (products.length > 0) {
      products.forEach((product) => {
        // Adjust price calculation to consider quantity and priceWithAddons
        const productTotal = product.priceWithAddons.value * product.quantity;
        totalPriceValue += productTotal;
      });
    }

    // Update the state with the new total price
    setTotalPrice(totalPriceValue);
    setCurrency(products.length > 0 ? products[0].price.currency : "");
  }, [products]); // Re-run whenever the products array changes

  return (
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
          Is This Order Correct ?{" "}
        </DialogTitle>
      </DialogHeader>

      <div
        className={` ${styles.flexStart} flex-col gap-2 lg:gap-8 overflow-hidden `}
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
                <div className=" w-20 min-w-20 h-20 lg:h-32 lg:min-w-32 bg-muted rounded-lg shadow ">
                  <img
                    className="w-full h-full object-cover"
                    src={product.image}
                    alt={product.title}
                  ></img>
                </div>
                {/* data */}
                <div
                  className={`grid lg:grid-cols-[1fr,auto] w-full h-full gap-2 lg:gap-4`}
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
                        <Badge
                          variant="default"
                          size={"sm"}
                          className="font-medium lg:text-xl"
                        >
                          Note
                        </Badge>
                      )}
                    </div>

                    {/* price */}
                    <p
                      className={` flex lg:justify-end ${styles.normal} lg:text-2xl opacity-70 font-bold text-accent `}
                    >
                      <span>{product.priceWithAddons.currency}</span>{" "}
                      {product.priceWithAddons.value * product.quantity}
                    </p>
                  </div>
                  {/* Quantity control */}
                  <div
                    className={`${styles.flexBetweenEnd} lg:flex-col w-full gap-4`}
                  >
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className=" size-6 lg:size-10 rounded-full"
                      onClick={() => {
                        setProductToEdit(product);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <SquarePen className=" lg:!size-5" />
                    </Button>
                    <div className="grid grid-cols-3 gap-0">
                      {/* delete */}

                      <Button
                        variant={"default2"}
                        size={"icon"}
                        className=" size-6 lg:size-12 rounded-full"
                        onClick={() => {
                          if (product.quantity == 1) {
                            setProductToDelete(product);
                            setIsAlertDialogOpen(true);
                          } else {
                            dispatch(
                              setProductQuantity({
                                variantId: product.cartUID,
                                change: "decrease",
                              })
                            );
                          }
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
          {/* Warning delete popup use */}
          <DeleteProductDialog
            isOpen={isAlertDialogOpen}
            product={productToDelete}
            onClose={() => setIsAlertDialogOpen(false)}
          />
          {/* Edit popup use */}
          <ProductCustomizationDialog
            isOpen={isEditDialogOpen}
            onClose={() => {
              setIsEditDialogOpen(false);
            }}
            product={productToEdit}
            products={allProducts} // You need to provide the products array
            mode={"edit"}
            onSubmit={() => {}}
          />
        </div>

        {/* price */}
        {products.length > 0 && (
          <div className="w-full shrink-0">
            <section
              className={` w-full p-1 space-y-2 rounded-lg border border-muted `}
            >
              {/* price recue */}
              <div
                className={` w-full p-2 space-y-2 lg:space-y-4 bg-sidebar rounded-md text-muted-foreground ${styles.small} lg:text-2xl font-semibold`}
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
                  className={` ${styles.flexBetween} ${styles.small} lg:text-3xl font-bold text-primary`}
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

      <DialogFooter className="grid grid-cols-[30%,1fr] gap-2 lg:gap-8 ">
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

interface DeleteProductDialogProps {
  isOpen: boolean;
  product?: CartProduct; // You can replace `any` with your product type if necessary
  onClose: () => void;
}

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  isOpen,
  product,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (product) {
      dispatch(
        setProductQuantity({
          variantId: product.cartUID,
          change: "decrease",
        })
      );
      onClose(); // Close the dialog after deleting
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="lg:gap-10">
        <AlertDialogHeader className="lg:gap-2">
          <AlertDialogTitle className="lg:text-3xl lg:font-bold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="lg:text-2xl">
            This action cannot be undone. This will delete{" "}
            <span className="font-bold">"{product && product.title}"</span> from
            your cart.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="lg:h-20 lg:text-3xl lg:p-8 w-full">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="lg:h-20 lg:text-3xl lg:p-8 w-full"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
