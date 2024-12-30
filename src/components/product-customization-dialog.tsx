"use client";

import { useEffect, useMemo, useState } from "react";

// styles

import { Button } from "@/components/ui/button";

import styles from "@/styles";

import {
  ArrowDown,
  CopyPlus,
  Flame,
  Recycle,
  Snowflake,
  SquarePen,
  Trash2,
} from "lucide-react";

// Redux

import { useDispatch } from "react-redux";

import { addProduct, editProduct } from "@/store/cart";

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
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

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

interface ProductCustomizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | CartProduct;
  products: Product[];
  mode: "edit" | "add";
  onSubmit: (updatedProduct: CartProduct) => void;
}

export const ProductCustomizationDialog: React.FC<
  ProductCustomizationDialogProps
> = ({ isOpen, onClose, product, products, mode, onSubmit }) => {
  const dispatch = useDispatch();

  const baseProduct: Product = useMemo(
    () =>
      products.find((p) => p.id === product.id) || {
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
        isVegan: false,
      },
    [product.id, products]
  );

  const [showIcePercentage, setShowIcePercentage] = useState(false);
  const [note, setNote] = useState("");
  const [tumbler, setTumbler] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState<string>("");
  const [variantOptions, setVariantOptions] = useState<VariantOptions | null>(
    null
  );
  const [addOns, setAddOns] = useState<AddOnOption[]>([]);
  const [nonPaidAddons, setNonPaidAddons] = useState<NonPaidAddons[]>([]);
  const [icePercentage, setIcePercentage] = useState<NonPaidAddons | null>(
    null
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      if (mode === "edit") {
        const cartProduct = product as CartProduct;
        setShowIcePercentage(cartProduct.temperature === "cold");
        setNote(cartProduct.note || "");
        setTumbler(cartProduct.tumbler);
        setQuantity(cartProduct.quantity);
        setTemperature(cartProduct.temperature);
        setVariantOptions(cartProduct.variantOptions);
        setAddOns(cartProduct.addOns);
        setNonPaidAddons(cartProduct.nonpaidAddons);
        setIcePercentage(cartProduct.icePercentage);
      } else {
        const newProduct = product as Product;
        setShowIcePercentage(newProduct.temperature[0] === "cold");
        setNote("");
        setTumbler(false);
        setQuantity(1);
        setTemperature(newProduct.temperature[0]);
        setVariantOptions(
          newProduct.variantOptions[1] || newProduct.variantOptions[0]
        );
        setAddOns(
          newProduct.addOns.map((addon, addonIndex) => ({
            ...addon,
            selectedOption: newProduct.addOns[addonIndex].selectedOption,
          }))
        );
        setNonPaidAddons(
          newProduct.nonpaidAddons.map((addon, addonIndex) => ({
            ...addon,
            selectedOption: newProduct.nonpaidAddons[addonIndex].selectedOption,
          }))
        );
        setIcePercentage(newProduct.icePercentage);
      }
    }
  }, [isOpen, product, mode]);

  useEffect(() => {
    setError(!temperature || !variantOptions);
    setShowIcePercentage(temperature === "cold");
  }, [temperature, variantOptions]);

  const handleTemperatureChange = (value: string) => {
    setTemperature(value);
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
    if (!variantOptions) return 0;
    let totalPrice = variantOptions.price.value;
    addOns.forEach((addOn) => {
      totalPrice += addOn.price.value * (addOn.selectedOption || 0);
    });
    return totalPrice * quantity;
  };

  const handleSubmit = () => {
    if (!variantOptions) return;
    const updatedProduct: CartProduct = {
      ...baseProduct,
      temperature,
      variantOptions,
      addOns,
      nonpaidAddons: nonPaidAddons,
      icePercentage: icePercentage || baseProduct.icePercentage,
      note,
      tumbler,
      quantity,
      price: variantOptions.price,
      priceWithAddons: {
        currency: variantOptions.price.currency,
        value: getTotalPrice() / quantity,
      },
      cartUID:
        mode === "add"
          ? "id-" + Math.random().toString(36).substr(2, 16)
          : (product as CartProduct).cartUID,
    };
    if (mode === "edit") {
      dispatch(
        editProduct({ productId: updatedProduct.cartUID, updatedProduct })
      );
    } else if (mode === "add") {
      dispatch(addProduct({ product: updatedProduct }));
    }
    onSubmit(updatedProduct);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${styles.flexStart} flex-col p-0 border-0`}>
        <DialogHeader className="relative grid grid-cols-[40%,1fr] kiosk:grid-cols-[480px,1fr] gap-2 kiosk:gap-8 pt-3 px-3 kiosk:p-5 kiosk:pb-0 w-full kiosk:min-h-[400px]">
          {/* Image */}
          <div className="absolute left-2 kiosk:left-5 bottom-0 w-[calc(40%-1rem)] kiosk:w-[480px] aspect-square bg-muted rounded-lg">
            <img
              className="w-full h-full object-cover"
              src={product?.image}
              alt={product?.title}
            />
          </div>
          {/* Image placeholder */}
          <div></div>
          {/* Title, Description, and Temperature */}
          <div
            className={`relative ${styles.flexBetween} h-full flex-col gap-1 self-end`}
          >
            <div
              className={`${styles.flexStart} flex-col gap-2 kiosk:gap-8 w-full`}
            >
              <DialogTitle
                className={`${styles.normal} kiosk:text-3xl font-bold`}
              >
                {product?.title}
              </DialogTitle>
              <DialogDescription
                className={`${styles.Xsmall} kiosk:text-2xl text-primary font-normal`}
              >
                {product?.description}
              </DialogDescription>
            </div>
            {/* Temperature */}
            <div className={`${styles.flexStart} flex-col gap-2 w-full`}>
              <RadioGroup
                className={`${styles.flexCenter} w-full gap-2`}
                value={temperature}
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
          className={`grid gap-4 kiosk:gap-8 w-full h-full overflow-x-hidden overflow-y-auto pb-4 px-3 kiosk:p-5 kiosk:pt-0 overflow-hidden`}
        >
          {/* Ice Percentage */}
          {showIcePercentage && icePercentage && (
            <>
              <Separator className={`h-[2px] bg-muted`} decorative={true} />
              <div
                className={`grid grid-rows-[auto_auto] sm:grid-rows-none sm:grid-cols-[23.7%_1fr] kiosk:grid-cols-[22.8%_1fr] items-center gap-2`}
              >
                <div className={`flex justify-start items-center gap-2`}>
                  <Snowflake className="size-4 kiosk:size-7 text-blue-400" />
                  <h3
                    className={`${styles.Xsmall} kiosk:text-2xl font-semibold`}
                  >
                    Ice
                  </h3>
                </div>
                <RadioGroup
                  className={`grid grid-cols-${icePercentage.options.length} w-full gap-2 `}
                  value={icePercentage.selectedOption.toString()}
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
                className={`grid grid-rows-[auto_auto] sm:grid-rows-none sm:grid-cols-[23.7%_1fr] kiosk:grid-cols-[22.8%_1fr] items-center gap-2`}
              >
                <div className={`flex justify-start items-center gap-2`}>
                  {addon.icon && (
                    <div className={`size-4 kiosk:size-7`}>
                      <img
                        className="w-full h-full object-cover"
                        src={addon.icon}
                        alt={addon.name}
                      />
                    </div>
                  )}
                  <h3
                    className={`${styles.Xsmall} kiosk:text-2xl font-semibold`}
                  >
                    {addon.name}
                  </h3>
                </div>
                <RadioGroup
                  className={`grid grid-cols-${addon.options.length} w-full gap-2`}
                  value={addon.selectedOption.toString()}
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
            className={`grid grid-rows-[auto_auto] sm:grid-rows-none sm:grid-cols-[23.7%_1fr] kiosk:grid-cols-[22.8%_1fr] items-center gap-2 w-full`}
          >
            <div className={`flex justify-start items-center gap-2`}>
              <VariantIcon className="size-4 kiosk:size-7" />
              <h3 className={`${styles.Xsmall} kiosk:text-2xl font-semibold`}>
                Variants
              </h3>
            </div>
            <RadioGroup
              className={`grid grid-cols-${baseProduct.variantOptions.length} w-full gap-2`}
              value={variantOptions?.name}
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
          <div
            className={`${styles.flexStart} flex-col gap-4 kiosk:gap-8 w-full`}
          >
            <div className={`flex justify-start items-center gap-2 pb-1`}>
              <CopyPlus className="size-4 kiosk:size-7" />
              <h3 className={`${styles.Xsmall} kiosk:text-2xl font-semibold`}>
                Add-ons
              </h3>
            </div>
            <div
              className={`${styles.flexStart} flex-col gap-4 kiosk:gap-8 w-full pt-0 kiosk:pt-7`}
            >
              {addOns.map((addOn, index) => (
                <div
                  key={index}
                  className={`grid place-items-center gap-1 kiosk:gap-8 px-2 w-full`}
                >
                  <div className={`${styles.flexBetween} gap-2 w-full`}>
                    <div className={`${styles.flexCenter} gap-2 kiosk:gap-4`}>
                      {addOn.icon && (
                        <div className={`size-4 kiosk:size-12`}>
                          <img
                            src={addOn.icon}
                            alt={addOn.name}
                            width={48}
                            height={48}
                          />
                        </div>
                      )}
                      <h4
                        className={`${styles.Xsmall} kiosk:text-2xl font-semibold`}
                      >
                        {addOn.name}
                      </h4>
                    </div>
                    <div className={`${styles.flexCenter} gap-2`}>
                      <div
                        className={`${styles.small} kiosk:text-xl whitespace-nowrap grid place-items-center font-semibold`}
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
                          } size-8 kiosk:size-10 hover:scale-100`}
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
                          } grid place-items-center size-8 kiosk:size-10 font-bold text-base kiosk:text-xl`}
                        >
                          {addOn.selectedOption}
                        </div>
                        <Button
                          variant="default2"
                          size="icon"
                          className="size-8 kiosk:size-10 hover:scale-100"
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
            className={`grid grid-rows-[auto_auto] sm:grid-rows-none sm:grid-cols-[23.7%_1fr] kiosk:grid-cols-[22.8%_1fr] items-center gap-2 w-full`}
          >
            <div className={`flex justify-start items-center gap-2`}>
              <Recycle className="size-4 kiosk:size-7" />
              <h3 className={`${styles.Xsmall} kiosk:text-2xl font-semibold`}>
                Use Tumbler
              </h3>
            </div>
            <ToggleGroup
              className="w-full"
              type="single"
              value={tumbler ? "true" : "false"}
              onValueChange={(value) => setTumbler(value === "true")}
            >
              <ToggleGroupItem
                value="true"
                aria-label="Toggle personal cup"
                variant="default"
                className="w-full toggleBaseStyle"
              >
                <GreenEarthIcon className="kiosk:!size-8 text-green-500" />
                Use Your Personal Cup
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <Separator className="h-[2px] bg-muted" decorative={true} />

          {/* Note */}
          <form className="flex justify-start items-center flex-col gap-2 kiosk:gap-8">
            <Label
              htmlFor="note"
              className={`flex justify-start items-center gap-2 ${styles.small} font-semibold w-full text-left`}
            >
              <SquarePen className="size-4 kiosk:size-7" />
              <h3 className={`${styles.Xsmall} kiosk:text-2xl font-semibold`}>
                Note
              </h3>
            </Label>
            <Input
              value={note}
              id="note"
              placeholder="Write your Note here..."
              className="h-10 kiosk:h-24 outline-none ring-0 kiosk:text-2xl"
              onChange={(e) => setNote(e.target.value)}
            />
          </form>
          {error && (
            <p className={`${styles.Xsmall} text-destructive`}>
              Please make sure to select all Addons.
            </p>
          )}
        </div>

        {/* CTA */}
        <div
          className={`grid grid-row-2 w-full gap-2 kiosk:gap-6 p-3 kiosk:p-5 border border-muted-foreground/30`}
        >
          <div
            className={`grid grid-cols-[1fr_auto] w-full gap-3 p-1 kiosk:p-3 border border-muted-foreground/50 rounded-t-lg`}
          >
            <div className={`flex justify-start items-center flex-wrap gap-1`}>
              {addOns
                .filter((addOn) => addOn.selectedOption > 0)
                .map((addOn, addOnIndex) => (
                  <Badge
                    key={addOnIndex}
                    className="bg-muted-foreground rounded-b-none kiosk:text-xl font-medium"
                  >
                    +{addOn.selectedOption * addOn.price.value} {addOn.name}
                  </Badge>
                ))}
            </div>
            <div className={`${styles.flexCenter} gap-2 kiosk:gap-4`}>
              <Button
                variant="default2"
                size="icon"
                className={`${
                  quantity === 1 && "hidden"
                } size-8 kiosk:size-10 hover:scale-100`}
                onClick={() => {
                  setQuantity(quantity - 1);
                }}
              >
                -
              </Button>
              <div
                className={`grid place-items-center ${styles.Xsmall} kiosk:text-2xl font-semibold`}
              >
                {quantity}
              </div>
              <Button
                variant="default2"
                size="icon"
                className="size-8 kiosk:size-10 hover:scale-100"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </Button>
            </div>
          </div>

          <DialogFooter className="grid grid-cols-[30%,1fr] gap-2 kiosk:gap-8">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full rounded-t-none kiosk:h-20 kiosk:text-3xl kiosk:p-8"
              >
                Back
              </Button>
            </DialogClose>

            <Button
              className="text-primary-foreground rounded-t-none kiosk:h-20 kiosk:text-3xl kiosk:p-8"
              disabled={error}
              onClick={handleSubmit}
            >
              <span className="w-full text-left">
                {mode === "edit" ? "Edit" : "Add to cart"}
              </span>
              {getTotalPrice()} {variantOptions?.price.currency}
              <ArrowDown className="kiosk:!size-8" />
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCustomizationDialog;
