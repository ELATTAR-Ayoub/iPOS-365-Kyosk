"use client";

import { useMemo, useState } from "react";

// styles
import { Button } from "@/components/ui/button";
import styles from "@/styles";
import {
  ArrowDown,
  CopyPlus,
  Flame,
  Minus,
  Plus,
  Recycle,
  ShoppingBasket,
  Snowflake,
  SquarePen,
  Trash2,
} from "lucide-react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { editProduct, setProductQuantity } from "@/store/cart";

// Icons

// components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import {
  AddOnOption,
  CartProduct,
  NonPaidAddons,
  Product,
  VariantOptions,
} from "@/constants/interfaces";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { VariantIcon } from "@/components/icons/variants-icon";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GreenEarthIcon } from "@/components/icons/green-earth-icon";
import { Input } from "@/components/ui/input";

const Cart = () => {
  // values
  //   const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.products);

  function getTotalPrice() {
    let totalPriceValue = 0;

    // Find how much Addons add to the price
    if (products.length > 0) {
      products.forEach((product) => {
        const t = product.priceWithAddons.value;
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
                      {product.priceWithAddons.value}
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
          <DeleteProductDialog
            isOpen={isAlertDialogOpen}
            product={productToDelete}
            onClose={() => setIsAlertDialogOpen(false)}
          />
          <EditProductDialog
            isOpen={isEditDialogOpen}
            product={productToEdit}
            onClose={() => setIsEditDialogOpen(false)}
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

interface EditProductDialogProps {
  isOpen: boolean;
  product: CartProduct; // You can replace `any` with your product type if necessary
  onClose: () => void;
}

import { products } from "@/constants/index";

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  isOpen,
  product,
  onClose,
}) => {
  // values
  const dispatch = useDispatch();

  // Find the base product
  const baseProduct: Product = products.find((p) => p.id === product.id) || {
    id: "",
    image: "",
    title: "",
    description: "",
    variantOptions: [],
    temperature: [],
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
  };

  // State initialization with user's previous selections
  const [showIcePercentage, setShowIcePercentage] = useState(
    product.temperature === "cold"
  );
  const [note, setNote] = useState(product.note || "");
  const [tumbler, setTumbler] = useState(product.tumbler);
  const [quantity, setQuantity] = useState(product.quantity);
  const [temperature, setTemperature] = useState(product.temperature);
  const [variantOptions, setVariantOptions] = useState<VariantOptions>(
    product.variantOptions
  );
  const [addOns, setAddOns] = useState<AddOnOption[]>(product.addOns);
  const [nonPaidAddons, setNonPaidAddons] = useState<NonPaidAddons[]>(
    product.nonpaidAddons
  );
  const [icePercentage, setIcePercentage] = useState(product.icePercentage);
  const [error, setError] = useState(false);

  // Memoized error checking
  useMemo(() => {
    setError(!temperature || !variantOptions);
    setShowIcePercentage(temperature === "cold");
  }, [temperature, variantOptions]);

  const handleTemperatureChange = (value: string) => {
    setTemperature(value as "hot" | "cold");
    if (value === "cold") {
      setIcePercentage(baseProduct.icePercentage);
    } else {
      setIcePercentage({ ...baseProduct.icePercentage, selectedOption: "" });
    }
  };

  const handleVariantChange = (value: string) => {
    const selectedVariant = baseProduct.variantOptions.find(
      (v) => v.name === value
    );
    if (selectedVariant) {
      setVariantOptions(selectedVariant);
    }
  };

  const handleAddOnChange = (addOnIndex: number, value: number) => {
    setAddOns((prevAddOns) =>
      prevAddOns.map((addOn, index) =>
        index === addOnIndex ? { ...addOn, selectedOption: value } : addOn
      )
    );
  };

  const handleNonPaidAddonChange = (addonIndex: number, value: string) => {
    setNonPaidAddons((prevAddons) =>
      prevAddons.map((addon, index) =>
        index === addonIndex ? { ...addon, selectedOption: value } : addon
      )
    );
  };

  const getTotalPrice = () => {
    let totalPrice = variantOptions.price.value;
    addOns.forEach((addOn) => {
      totalPrice += addOn.price.value * addOn.selectedOption;
    });
    return totalPrice * quantity;
  };

  const handleSubmit = () => {
    const updatedProduct: CartProduct = {
      ...product,
      temperature,
      variantOptions,
      addOns,
      nonpaidAddons: nonPaidAddons,
      icePercentage,
      note,
      tumbler,
      quantity,
      price: variantOptions.price,
      priceWithAddons: {
        currency: variantOptions.price.currency,
        value: getTotalPrice(),
      },
    };
    dispatch(
      editProduct({ variantId: product.cartUID, newProduct: updatedProduct })
    );
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${styles.flexStart} flex-col p-0 border-0 `}>
        <DialogHeader
          className={` relative grid grid-cols-2 lg:grid-cols-[480px,1fr] gap-2 pt-3 px-3 lg:p-5 lg:pb-0 w-full lg:min-h-[400px]   `}
        >
          {/* img */}
          <div className=" absolute left-2 lg:left-5 bottom-0 w-[calc(40%-.5rem)] lg:w-[calc(45%-.5rem)] aspect-square bg-muted rounded-lg ">
            <img
              className="w-full h-full object-cover"
              src={product?.image}
              alt={product?.title}
            ></img>
          </div>
          {/* img placeholder */}
          <div></div>
          {/* Title and Description and Size */}
          <div
            className={` relative ${styles.flexBetween} h-full flex-col gap-1 self-end  `}
          >
            <div
              className={`${styles.flexStart} flex-col gap-2 lg:gap-8 w-full`}
            >
              <DialogTitle
                className={` ${styles.normal} lg:text-3xl font-bold`}
              >
                {product?.title}
              </DialogTitle>
              <DialogDescription
                className={` ${styles.Xsmall} lg:text-2xl text-primary font-normal`}
              >
                {product?.description}
              </DialogDescription>
            </div>
            {/* Mode */}
            <div className={`${styles.flexStart} flex-col gap-2 w-full`}>
              {/* <h3 className={` ${styles.small} font-semibold`}>Mode</h3> */}
              <RadioGroup
                className="grid grid-cols-2 w-full gap-2"
                defaultValue={temperature}
                onValueChange={handleTemperatureChange}
              >
                {baseProduct.temperature.map((temp) => (
                  <Label
                    key={temp}
                    htmlFor={`temperature-${temp}`}
                    className={`toggleBaseStyle capitalize`}
                  >
                    <RadioGroupItem
                      value={temp}
                      id={`temperature-${temp}`}
                      className="sr-only"
                    />
                    {temp === "cold" ? (
                      <Snowflake className="h-4 w-4 text-blue-400" />
                    ) : (
                      <Flame className="h-4 w-4 text-destructive" />
                    )}
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div
          className={`grid gap-4 lg:gap-8 w-full h-full overflow-x-hidden overflow-y-auto pb-4 px-3 lg:p-5 overflow-hidden `}
        >
          <Separator
            className={` h-[2px] bg-muted ${!showIcePercentage && "hidden"}`}
            decorative={true}
          />

          {/* Ice Percentage */}
          {showIcePercentage && (
            <>
              <Separator className={`h-[2px] bg-muted`} decorative={true} />
              <div
                className={`grid grid-rows-[auto_auto] sm:grid-rows-none sm:grid-cols-[33%_1fr] items-center w-full gap-2`}
              >
                <div className={`flex justify-start items-center gap-2`}>
                  <Snowflake className="size-4 lg:size-7 text-blue-400" />
                  <h3 className={`${styles.Xsmall} lg:text-2xl font-semibold`}>
                    Ice
                  </h3>
                </div>
                <RadioGroup
                  className="grid grid-cols-3 w-full gap-2"
                  defaultValue={icePercentage.selectedOption.toString()}
                  onValueChange={(value) =>
                    setIcePercentage({
                      ...icePercentage,
                      selectedOption: value,
                    })
                  }
                >
                  {icePercentage.options.map((option) => (
                    <Label
                      key={option}
                      htmlFor={`icePercentage-${option}`}
                      className={`toggleBaseStyle`}
                    >
                      <RadioGroupItem
                        value={option.toString()}
                        id={`icePercentage-${option}`}
                        className="sr-only"
                      />
                      {option}
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </>
          )}

          <Separator className="h-[2px] bg-muted" decorative={true} />

          {/* Non-paid Add-ons */}
          <div className={`grid w-full gap-3`}>
            {nonPaidAddons.map((addon, index) => (
              <div
                key={index}
                className={`grid grid-rows-[auto_auto] sm:grid-rows-none sm:grid-cols-[33%_1fr] items-center gap-2`}
              >
                <div className={`flex justify-start items-center gap-2`}>
                  {addon.icon && (
                    <div className={`size-4 lg:size-7`}>
                      <img
                        src={addon.icon}
                        alt={addon.name}
                        width={28}
                        height={28}
                      />
                    </div>
                  )}
                  <h3 className={`${styles.Xsmall} lg:text-2xl font-semibold`}>
                    {addon.name}
                  </h3>
                </div>
                <RadioGroup
                  className="grid grid-cols-3 w-full gap-2"
                  defaultValue={addon.selectedOption.toString()}
                  onValueChange={(value) =>
                    handleNonPaidAddonChange(index, value)
                  }
                >
                  {addon.options.map((option) => (
                    <Label
                      key={option}
                      htmlFor={`${addon.name}-${option}`}
                      className={`toggleBaseStyle`}
                    >
                      <RadioGroupItem
                        value={option.toString()}
                        id={`${addon.name}-${option}`}
                        className="sr-only"
                      />
                      {option}
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>

          <Separator className="h-[2px] bg-muted" decorative={true} />

          {/* Variants */}
          <div
            className={`grid grid-rows-[auto_auto] sm:grid-rows-none sm:grid-cols-[33%_1fr] items-center gap-2 w-full`}
          >
            <div className={`flex justify-start items-center gap-2`}>
              <VariantIcon className="size-4 lg:size-7" />
              <h3 className={`${styles.Xsmall} lg:text-2xl font-semibold`}>
                Variants
              </h3>
            </div>
            <RadioGroup
              className="grid grid-cols-3 w-full gap-2"
              defaultValue={variantOptions.name}
              onValueChange={handleVariantChange}
            >
              {baseProduct.variantOptions.map((variant) => {
                const mediumVariant =
                  baseProduct.variantOptions[1] ||
                  baseProduct.variantOptions[0];
                const priceDifference = mediumVariant
                  ? variant.price.value - mediumVariant.price.value
                  : 0;
                const priceText =
                  priceDifference === 0
                    ? ""
                    : priceDifference > 0
                    ? `+${priceDifference}`
                    : `${priceDifference}`;

                return (
                  <Label
                    key={variant.name}
                    htmlFor={`variantOptions-${variant.name}`}
                    className={`toggleBaseStyle capitalize`}
                  >
                    <RadioGroupItem
                      value={variant.name}
                      id={`variantOptions-${variant.name}`}
                      className="sr-only"
                    />
                    {variant.name} {priceText}
                  </Label>
                );
              })}
            </RadioGroup>
          </div>

          <Separator className="h-[2px] bg-muted" decorative={true} />

          {/* Add-ons */}
          <div className={`${styles.flexStart} flex-col gap-4 lg:gap-8 w-full`}>
            <div className={`flex justify-start items-center gap-2 pb-1`}>
              <CopyPlus className="size-4 lg:size-7" />
              <h3 className={`${styles.Xsmall} lg:text-2xl font-semibold`}>
                Add-ons
              </h3>
            </div>
            <div
              className={`${styles.flexStart} flex-col gap-4 lg:gap-8 w-full pt-7`}
            >
              {addOns.map((addOn, index) => (
                <div
                  key={index}
                  className={`grid place-items-center gap-1 lg:gap-8 px-2 w-full`}
                >
                  <div className={`${styles.flexBetween} gap-2 w-full`}>
                    <div className={`${styles.flexCenter} gap-2 lg:gap-4`}>
                      {addOn.icon && (
                        <div className={`size-4 lg:size-12`}>
                          <img
                            src={addOn.icon}
                            alt={addOn.name}
                            width={48}
                            height={48}
                          />
                        </div>
                      )}
                      <h4
                        className={`${styles.Xsmall} lg:text-2xl font-semibold`}
                      >
                        {addOn.name}
                      </h4>
                    </div>
                    <div className={`${styles.flexCenter} gap-2`}>
                      <div
                        className={`${styles.small} lg:text-xl whitespace-nowrap grid place-items-center font-semibold`}
                      >
                        {addOn.selectedOption > 0 ? (
                          `+ ${(
                            addOn.price.value * addOn.selectedOption
                          ).toFixed(2)}`
                        ) : (
                          <span className="opacity-50">
                            + {addOn.price.value}
                          </span>
                        )}
                      </div>
                      <div
                        className={`${styles.flexCenter} bg-primary text-primary-foreground rounded-md gap-2`}
                      >
                        <Button
                          variant="default2"
                          size="icon"
                          className={`${
                            addOn.selectedOption === 0 ? "hidden" : ""
                          } size-8 lg:size-10 hover:scale-100`}
                          onClick={() =>
                            handleAddOnChange(
                              index,
                              Math.max(0, addOn.selectedOption - 1)
                            )
                          }
                        >
                          {addOn.selectedOption > 1 ? "-" : <Trash2 />}
                        </Button>
                        <div
                          className={`${
                            addOn.selectedOption === 0 ? "hidden" : ""
                          } grid place-items-center size-8 lg:size-10 font-bold text-base lg:text-xl`}
                        >
                          {addOn.selectedOption}
                        </div>
                        <Button
                          variant="default2"
                          size="icon"
                          className="size-8 lg:size-10 hover:scale-100"
                          onClick={() =>
                            handleAddOnChange(
                              index,
                              Math.min(
                                parseInt(addOn.options.slice(-1)[0], 10),
                                addOn.selectedOption + 1
                              )
                            )
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index !== addOns.length - 1 && (
                    <Separator
                      className="h-[2px] bg-muted w-10/12"
                      decorative={true}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator className="h-[2px] bg-muted" decorative={true} />

          {/* Use Tumbler */}
          <div
            className={`grid grid-rows-[auto_auto] sm:grid-rows-none sm:grid-cols-[33%_1fr] items-center gap-2 w-full`}
          >
            <div className={`flex justify-start items-center gap-2`}>
              <Recycle className="size-4 lg:size-7" />
              <h3 className={`${styles.Xsmall} lg:text-2xl font-semibold`}>
                Use Tumbler
              </h3>
            </div>
            <ToggleGroup
              className="w-full"
              type="single"
              defaultValue={tumbler ? "true" : "false"}
              onValueChange={(value) => setTumbler(value === "true")}
            >
              <ToggleGroupItem
                value="true"
                aria-label="Toggle personal cup"
                variant="default"
                className="w-full toggleBaseStyle"
              >
                <GreenEarthIcon className="size-8 lg:size-10 text-green-500" />
                Use Your Personal Cup
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <Separator className="h-[2px] bg-muted" decorative={true} />

          {/* Note */}
          <form className="flex justify-start items-center flex-col lg:gap-8">
            <Label
              htmlFor="note"
              className={`flex justify-start items-center gap-2 ${styles.small} font-semibold w-full text-left`}
            >
              <SquarePen className="size-4 lg:size-7" />
              <h3 className={`${styles.Xsmall} lg:text-2xl font-semibold`}>
                Note
              </h3>
            </Label>
            <Input
              value={note}
              id="note"
              placeholder="Write your Note here..."
              className="h-10 lg:h-24 outline-none ring-0 lg:text-2xl"
              onChange={(e) => setNote(e.target.value)}
            />
          </form>
          {error && (
            <p className={` ${styles.Xsmall} text-destructive`}>
              Please make sure to select all Addons.
            </p>
          )}
        </div>

        {/* CTA */}

        <div
          className={`grid grid-row-2 w-full gap-2 lg:gap-6 p-3 lg:p-5 border border-muted-foreground/30  `}
        >
          <div
            className={`grid grid-cols-[1fr_auto] w-full gap-3 p-1 lg:p-3 border border-muted-foreground/50 rounded-t-lg`}
          >
            <div className={` flex justify-start items-center flex-wrap gap-1`}>
              {addOns
                .filter((addOn) => addOn.selectedOption > 0)
                .map((addOn, addOnIndex) => (
                  <Badge
                    key={addOnIndex}
                    className=" bg-muted-foreground rounded-b-none lg:text-xl font-medium"
                  >
                    {" "}
                    +{addOn.selectedOption * addOn.price.value} {addOn.name}{" "}
                  </Badge>
                ))}
            </div>
            <div className={`${styles.flexCenter} gap-2 lg:gap-4  `}>
              <Button
                variant={"default2"}
                size={"icon"}
                className={` ${
                  quantity == 1 && "hidden"
                } size-8 lg:size-10 hover:scale-100 `}
                onClick={() => {
                  setQuantity(quantity - 1);
                }}
              >
                -
              </Button>
              {/* MemoizedAddOn only re-renders when addOn.selectedOption changes */}
              <div
                className={`grid place-items-center ${styles.Xsmall} lg:text-2xl font-semibold `}
              >
                {quantity}
              </div>
              <Button
                variant={"default2"}
                size={"icon"}
                className="size-8 lg:size-10 hover:scale-100"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </Button>
            </div>
          </div>

          <DialogFooter className="grid grid-cols-[30%,1fr] gap-2 lg:gap-8 ">
            <DialogClose asChild>
              <Button
                variant={"outline"}
                className="w-full rounded-t-none lg:h-20 lg:text-3xl lg:p-8"
              >
                Back
              </Button>
            </DialogClose>

            <Button
              className=" text-primary-foreground rounded-t-none lg:h-20 lg:text-3xl lg:p-8"
              disabled={error}
              onClick={handleSubmit}
            >
              <span className="w-full text-left">Edit </span>
              {getTotalPrice()} {variantOptions.price.currency}
              <ArrowDown className="lg:!size-8" />
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
