import { useMemo, useState } from "react";

// constants
import {
  CartProduct,
  Product,
  TemperatureOption,
} from "@/constants/interfaces";
import styles from "@/styles";
import {
  ArrowRight,
  CopyPlus,
  Flame,
  Recycle,
  Snowflake,
  SquarePen,
  Trash2,
} from "lucide-react";

// Comp
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// redux:
import { useDispatch } from "react-redux";
// import { RootState } from "@/store/store";
import { addProduct } from "@/store/cart";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup } from "./ui/radio-group";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { Separator } from "@radix-ui/react-separator";
import { Badge } from "./ui/badge";
import { VariantIcon } from "./icons/variants-icon";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { GreenEarthIcon } from "./icons/green-earth-icon";

// ProductCard component
const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const [showIcePercentage, setShowIcePercentage] = useState(false);
  const [note, setNote] = useState("");
  const [tumbler, setTumbler] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState(product.temperature[0]);
  const [variantOptions, setvariantOptions] = useState(
    product.variantOptions[1] || product.variantOptions[0]
  );
  const [addOns, setAddOns] = useState(
    product.addOns.map((addOn, index) => ({
      ...addOn,
      selectedOption: product.addOns[index].selectedOption,
    }))
  );
  const [nonPaidAddons, setNonPaidAddons] = useState(
    product.nonpaidAddons.map((addOn, index) => ({
      ...addOn,
      selectedOption: product.nonpaidAddons[index].selectedOption,
    }))
  );
  const [icePercentage, setIcePercentage] = useState(product.icePercentage);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState(false);

  // Memoize the check for empty temperature or variantOptions
  useMemo(() => {
    if (!temperature || !variantOptions) {
      setError(true); // If either value is empty, set error to true
    } else {
      setError(false); // Reset error if both values are not empty
    }

    if (temperature == "cold") {
      setShowIcePercentage(true);
    } else {
      setShowIcePercentage(false);
    }
  }, [temperature, variantOptions]); // Depend on both temperature and variantOptions

  useMemo(() => {
    resetProduct();
  }, [isDialogOpen]);

  function addToCart() {
    const selectedProduct: CartProduct = {
      ...product,
      addOns: addOns.map(
        ({ name, type, options, selectedOption, price, icon }) => ({
          name,
          type,
          options,
          selectedOption,
          price,
          icon,
        })
      ),
      nonpaidAddons: nonPaidAddons.map(
        ({ name, type, options, selectedOption }) => ({
          name,
          type,
          options,
          selectedOption,
        })
      ),
      temperature,
      icePercentage,
      variantOptions,
      note,
      tumbler,
      quantity: quantity,
      price: {
        currency: variantOptions.price.currency,
        value: getTotalPrice(),
      },
      cartUID: "id-" + Math.random().toString(36).substr(2, 16),
    };
    dispatch(addProduct({ product: selectedProduct }));
    console.log(selectedProduct);
    resetProduct();
    setIsDialogOpen(false);
  }

  function resetProduct() {
    setTemperature(product.temperature[1] || product.temperature[0]);
    setvariantOptions(product.variantOptions[1] || product.variantOptions[0]);
    setAddOns(
      product.addOns.map((addOn) => ({
        ...addOn,
        selectedOption: addOn.selectedOption,
      }))
    );
    setNonPaidAddons(
      product.nonpaidAddons.map((nonPaidAddon) => ({
        ...nonPaidAddon,
        selectedOption: nonPaidAddon.selectedOption,
      }))
    );
    setIcePercentage(product.icePercentage);
    setNote("");
  }

  function getTotalPrice() {
    // Use the variant price as a base
    let totalPriceValue = variantOptions.price.value;

    // Find how much Addons add to the price
    addOns.forEach((addOn) => {
      const t = addOn.price.value * addOn.selectedOption;
      totalPriceValue = totalPriceValue + t;
    });

    totalPriceValue = totalPriceValue * quantity;

    // Discounts in future

    return totalPriceValue;
  }

  return (
    <div className={`relative h-fit rounded-xl `}>
      {/* image */}

      <div className=" h-64 lg:h-80 cursor-pointer pos-item-drop-shadow ">
        <div className="h-3/4 relative ">
          {/* <!-- Image Section --> */}
          <div
            onClick={() => {
              setIsDialogOpen(true);
            }}
            className="absolute w-32 h-32 lg:h-40 lg:w-40 top-0 left-1/2 transform -translate-x-1/2 z-30 bg-muted rounded-lg"
          >
            <img
              className="w-full h-full object-cover"
              src={product.image}
              alt={product.title}
            ></img>
          </div>
          {/* <!-- Content Overlay Section --> */}
          <div className="absolute bg-secondary top-[30%] left-0 w-full z-20 rounded-t-2xl rounded-br-2xl h-3/4 ">
            <div className={` space-y-1 w-full h-full mt-16 lg:mt-20 p-4`}>
              <h2
                className={` text-sm lg:text-base font-semibold line-clamp-1 leading-tight `}
              >
                {product.title}
              </h2>

              <p
                className={` text-xs lg:text-sm font-medium opacity-70 line-clamp-2 `}
              >
                {product.description}
              </p>
            </div>
          </div>
        </div>
        {/* <!-- Price and Action Section --> */}
        <div className="flex items-center mt-[9px] lg:mt-3 h-12 lg:h-14 gap-2">
          {/* <!-- Price Section --> */}
          <div className="relative w-[calc(80%-12px)] h-full z-8 ">
            <div className=" bg-secondary peer rounded-b-2xl flex items-center justify-start w-full h-full text-accent font-bold px-4">
              <p
                className={` ${styles.normal} lg:text-2xl opacity-70 font-bold `}
              >
                <span>{product.variantOptions[0].price.currency}</span>{" "}
                {product.variantOptions[0].price.value}
              </p>
            </div>
            <div className="absolute -top-[24px] right-[-23px] -z-10 inv-rad inv-rad-6 bg-secondary transition size-12"></div>
          </div>
          {/* <!-- Arrow Button Section --> */}
          <Button
            variant={"muted"}
            onClick={() => setIsDialogOpen(true)}
            className=" rounded-full z-20 hover:-rotate-12 lg:w-12 lg:h-12 "
            size="icon"
          >
            {" "}
            <ArrowRight />
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={`${styles.flexStart} flex-col p-0 border-0 `}>
          <DialogHeader
            className={` relative grid grid-cols-2 lg:grid-cols-[480px,1fr] gap-2 pt-3 px-3 w-full lg:min-h-[400px]   `}
          >
            {/* img */}
            <div className=" absolute left-2 bottom-0 w-[calc(40%-.5rem)] lg:w-[calc(46%-.5rem)] aspect-square bg-muted rounded-lg ">
              <img
                className="w-full h-full object-cover"
                src={product.image}
                alt={product.title}
              ></img>
            </div>
            {/* img placeholder */}
            <div className=" rounded-lg "></div>
            {/* Title and Description and Size */}
            <div
              className={` relative ${styles.flexBetween} flex-col gap-1 self-end  `}
            >
              <div className={`${styles.flexStart} flex-col gap-2 w-full`}>
                <DialogTitle
                  className={` ${styles.normal} lg:text-3xl font-bold`}
                >
                  {product.title}
                </DialogTitle>
                <DialogDescription
                  className={` ${styles.Xsmall} lg:text-2xl text-primary font-semibold`}
                >
                  {product.description}
                </DialogDescription>
              </div>
              {/* Mode */}
              <div className={`${styles.flexStart} flex-col gap-2 w-full`}>
                {/* <h3 className={` ${styles.small} font-semibold`}>Mode</h3> */}
                <RadioGroup
                  className={`${styles.flexCenter} w-full gap-2`}
                  defaultValue={temperature}
                  onValueChange={(value: TemperatureOption) => {
                    setTemperature(value);
                    console.log("temperature", value);
                  }}
                >
                  {product.temperature.map((optionLabel) => (
                    <Label
                      htmlFor={`temperature-${optionLabel}`}
                      className={`toggleBaseStyle `}
                      key={optionLabel}
                    >
                      <RadioGroupItem
                        value={optionLabel}
                        id={`temperature-${optionLabel}`}
                        className="sr-only"
                      />
                      {optionLabel === "cold" ? (
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
            className={`grid gap-4 lg:gap-8 w-full h-full overflow-x-hidden overflow-y-auto pb-4 px-3   overflow-hidden `}
          >
            <Separator
              className={` h-[2px] bg-muted ${!showIcePercentage && "hidden"}`}
              decorative={true}
            />

            {/* Ice percentage */}
            <div
              className={`grid grid-rows-[auto_auto] sm:grid-rows-none sm:grid-cols-[33%_1fr] items-center w-full gap-2 ${
                !showIcePercentage && "hidden"
              }`}
            >
              <div className={`flex justify-start items-center gap-2`}>
                <Snowflake className="size-4 lg:size-7 text-blue-400" />

                <h3 className={` ${styles.Xsmall} lg:text-2xl font-semibold`}>
                  Ice
                </h3>
              </div>
              <RadioGroup
                className="grid grid-cols-3 w-full gap-2"
                defaultValue={icePercentage.selectedOption.toString()}
                onValueChange={(value: string) => {
                  // Convert the selected value to a number
                  const selectedValue = value;

                  setIcePercentage((prevIcePercentage) => {
                    // Assuming icePercentage is an object or array, and we are replacing or updating the relevant value.
                    return {
                      ...prevIcePercentage,
                      selectedOption: selectedValue, // If you need to update a specific field, ensure this matches your structure
                    };
                  });

                  console.log(
                    `Updated Ice Percentage: ${icePercentage.name}, Value: ${icePercentage.selectedOption}`
                  );
                }}
              >
                {product.icePercentage.options.map((optionLabel) => (
                  <Label
                    htmlFor={`icePercentage-${optionLabel}`}
                    className={`toggleBaseStyle`}
                    key={optionLabel}
                  >
                    <RadioGroupItem
                      value={optionLabel.toString()}
                      id={`icePercentage-${optionLabel}`}
                      className="sr-only"
                    />
                    {optionLabel}
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <Separator className=" h-[2px] bg-muted" decorative={true} />
            {/* non paid addones */}
            <div className={`grid w-full gap-3`}>
              {product.nonpaidAddons.map((addOn, addOnIndex) => (
                <div
                  key={addOnIndex}
                  className={`grid grid-rows-[auto_auto] sm:grid-rows-none sm:grid-cols-[33%_1fr] items-center gap-2`}
                >
                  <div className={`flex justify-start items-center gap-2`}>
                    <div className={` size-4 lg:size-7`}>
                      <img
                        className=" w-full h-full object-cover"
                        src={addOn.icon}
                        alt={addOn.name}
                      ></img>{" "}
                    </div>
                    <h3
                      className={` ${styles.Xsmall} lg:text-2xl font-semibold`}
                    >
                      {addOn.name}
                    </h3>
                  </div>
                  <RadioGroup
                    className="grid grid-cols-3 w-full gap-2"
                    defaultValue={addOn.selectedOption.toString()}
                    onValueChange={(value: string) => {
                      // Convert the selected value to a number
                      const selectedValue = value;

                      // Ensure that the selected value is a valid number
                      if (selectedValue) {
                        // Update the selectedOption in the addOns state
                        setNonPaidAddons((prevAddOns) =>
                          prevAddOns.map((prevAddOn, index) =>
                            index === addOnIndex
                              ? {
                                  ...prevAddOn,
                                  selectedOption: selectedValue,
                                }
                              : prevAddOn
                          )
                        );
                        console.log(
                          `Updated Add-On: ${addOn.name}, Value: ${addOn.selectedOption}`
                        );
                        console.log(addOn);
                      }
                    }}
                  >
                    {addOn.options.map((optionValue, optionIndex) => (
                      <Label
                        htmlFor={`${addOn.name}-${optionIndex}`}
                        className={`toggleBaseStyle`}
                        key={`${addOn.name}-${optionIndex}`}
                      >
                        <RadioGroupItem
                          value={optionValue.toString()}
                          id={`${addOn.name}-${optionIndex}`}
                          className="sr-only"
                        />
                        {optionValue}
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>
            {/* Variants */}
            <Separator className=" h-[2px] bg-muted" decorative={true} />
            <div
              className={`grid grid-rows-[auto_auto] sm:grid-rows-none sm:grid-cols-[33%_1fr] items-center gap-2 w-full`}
            >
              <div className={`flex justify-start items-center gap-2`}>
                <VariantIcon className="size-4 lg:size-7" size={20} />
                <h3 className={` ${styles.Xsmall} lg:text-2xl font-semibold`}>
                  Variants
                </h3>
              </div>
              <RadioGroup
                className="grid grid-cols-3 w-full gap-2"
                defaultValue={variantOptions.name}
                onValueChange={(value: string) => {
                  // Find the selected variant option by name
                  if (value) {
                    const selectedOption = product.variantOptions.find(
                      (option) => option.name === value
                    );
                    if (selectedOption) {
                      setvariantOptions(selectedOption); // Set the selected variant
                    }
                  }
                }}
              >
                {product.variantOptions.map((size) => {
                  // Find the medium size to use as the base
                  const mediumSize =
                    product.variantOptions[1] || product.variantOptions[0];

                  // If the medium size is found, calculate the price difference
                  const priceDifference = mediumSize
                    ? size.price.value - mediumSize.price.value
                    : 0;

                  // Determine the display text for the price difference
                  let priceText = "";
                  if (priceDifference < 0) {
                    priceText = `${priceDifference}`; // Display as "-20"
                  } else if (priceDifference > 0) {
                    priceText = `+${priceDifference}`; // Display as "+20"
                  }

                  return (
                    <Label
                      key={size.name}
                      htmlFor={`variantOptions-${size.name}`}
                      className={`toggleBaseStyle capitalize`}
                    >
                      <RadioGroupItem
                        value={size.name}
                        id={`variantOptions-${size.name}`}
                        className="sr-only"
                      />
                      {size.name} {priceText}
                    </Label>
                  );
                })}
              </RadioGroup>
            </div>
            <Separator className=" h-[2px] bg-muted" decorative={true} />
            {/* addones */}
            <div
              className={`${styles.flexStart} flex-col gap-4 lg:gap-8 w-full`}
            >
              <div className={`flex justify-start items-center gap-2 pb-1`}>
                <CopyPlus className="size-4 lg:size-7 " />
                <h3 className={` ${styles.Xsmall} lg:text-2xl font-semibold`}>
                  Add-ons
                </h3>
              </div>

              <div
                className={`${styles.flexStart} flex-col gap-4 lg:gap-8 w-full pt-7`}
              >
                {product.addOns.map((addOn, addOnIndex) => (
                  <div
                    className={`grid place-items-center gap-1 lg:gap-8 px-2 w-full`}
                  >
                    <div
                      key={addOnIndex}
                      className={`${styles.flexBetween} gap-2 w-full`}
                    >
                      <div className={`${styles.flexCenter} gap-2 lg:gap-4`}>
                        <div className={` size-4 lg:size-12`}>
                          <img
                            className=" w-full h-full object-cover"
                            src={addOn.icon}
                            alt={addOn.name}
                          ></img>{" "}
                        </div>
                        <h4
                          className={` ${styles.Xsmall} lg:text-2xl font-semibold`}
                        >
                          {addOn.name}
                        </h4>
                      </div>

                      <div className={`${styles.flexCenter} gap-2 `}>
                        <div
                          className={` ${styles.small} lg:text-xl whitespace-nowrap grid place-items-center font-semibold`}
                        >
                          {addOn.selectedOption > 0 ? (
                            `+ ${(
                              addOn.price.value * addOn.selectedOption
                            ).toFixed(2)}`
                          ) : (
                            <span className=" opacity-50">
                              + {addOn.price.value}
                            </span>
                          )}
                        </div>
                        <div
                          className={`${styles.flexCenter} bg-primary text-primary-foreground rounded-md  gap-2 `}
                        >
                          <Button
                            variant={"default2"}
                            size={"icon"}
                            className={` ${
                              addOn.selectedOption == 0 && "hidden"
                            } size-8 lg:size-10 hover:scale-100 `}
                            onClick={() => {
                              const minValue = addOn.options[0]; // Min value
                              console.log("minValue", minValue);
                              console.log("Value", addOn.selectedOption);

                              // Convert minValue to a number
                              const numericMinValue = parseInt(minValue, 10);

                              // Convert selectedOption to a number, defaulting to 0 if undefined
                              let currentSelectedOption =
                                addOn.selectedOption ?? 0;

                              // Ensure currentSelectedOption is a number
                              currentSelectedOption =
                                typeof currentSelectedOption === "string"
                                  ? parseInt(currentSelectedOption, 10)
                                  : currentSelectedOption;

                              // Perform the comparison
                              if (currentSelectedOption > numericMinValue) {
                                currentSelectedOption =
                                  currentSelectedOption - 1;
                              } else {
                                currentSelectedOption = numericMinValue;
                              }

                              addOn.selectedOption = currentSelectedOption;

                              setAddOns((prevAddOns) =>
                                prevAddOns.map((prevAddOn, index) =>
                                  index === addOnIndex
                                    ? {
                                        ...prevAddOn,
                                        selectedOption: currentSelectedOption,
                                      }
                                    : prevAddOn
                                )
                              );
                            }}
                          >
                            {addOn.selectedOption > 1 ? "-" : <Trash2 />}
                          </Button>
                          {/* MemoizedAddOn only re-renders when addOn.selectedOption changes */}
                          <div
                            className={` ${
                              addOn.selectedOption == 0 && "hidden"
                            } grid place-items-center size-8 lg:size-10 font-bold text-base lg:text-xl `}
                          >
                            {addOn.selectedOption || addOn.options[0]}
                          </div>
                          <Button
                            variant={"default2"}
                            size={"icon"}
                            className="size-8 lg:size-10 hover:scale-100"
                            onClick={() => {
                              const maxValue = addOn.options.slice(-1)[0]; // Min value
                              console.log("maxValue", maxValue);
                              console.log("Value", addOn.selectedOption);

                              // Convert minValue to a number
                              const numericMaxValue = parseInt(maxValue, 10);

                              // Convert selectedOption to a number, defaulting to 0 if undefined
                              let currentSelectedOption =
                                addOn.selectedOption ?? 0;

                              // Ensure currentSelectedOption is a number
                              currentSelectedOption =
                                typeof currentSelectedOption === "string"
                                  ? parseInt(currentSelectedOption, 10)
                                  : currentSelectedOption;

                              // Perform the comparison
                              if (currentSelectedOption < numericMaxValue) {
                                currentSelectedOption =
                                  currentSelectedOption + 1;
                              }

                              addOn.selectedOption = currentSelectedOption;

                              setAddOns((prevAddOns) =>
                                prevAddOns.map((prevAddOn, index) =>
                                  index === addOnIndex
                                    ? {
                                        ...prevAddOn,
                                        selectedOption: currentSelectedOption,
                                      }
                                    : prevAddOn
                                )
                              );
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                    {addOnIndex != addOns.length - 1 && (
                      <Separator
                        className=" h-[2px] bg-muted w-10/12"
                        decorative={true}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <Separator className=" h-[2px] bg-muted" decorative={true} />
            {/* Use Tumbler */}
            <div
              className={`grid grid-rows-[auto_auto] sm:grid-rows-none sm:grid-cols-[33%_1fr] items-center gap-2 w-full`}
            >
              <div className={`flex justify-start items-center gap-2`}>
                <Recycle className="size-4 lg:size-7" />
                <h3 className={` ${styles.Xsmall} lg:text-2xl font-semibold`}>
                  Use Tumbler
                </h3>
              </div>

              <ToggleGroup
                className="w-full"
                type="single"
                defaultValue={tumbler ? "true" : "false"}
                onValueChange={(value) => {
                  setTumbler(value === "true");
                }}
              >
                <ToggleGroupItem
                  value="true"
                  aria-label="Toggle personal cup"
                  variant="default"
                  className="w-full toggleBaseStyle"
                >
                  <GreenEarthIcon
                    className="size-8 lg:size-10 text-green-500"
                    size={32}
                  />
                  {/* <Leaf className="text-green-500 w-4 h-4" /> */}
                  Use Your Personal Cup{" "}
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <Separator className=" h-[2px] bg-muted " decorative={true} />
            {/* Note */}
            <form className="flex justify-start items-center flex-col lg:gap-8">
              <Label
                htmlFor="search"
                className={`flex justify-start items-center gap-2  ${styles.small} font-semibold w-full text-left`}
              >
                <SquarePen className="size-4 lg:size-7 " />{" "}
                <h3 className={` ${styles.Xsmall} lg:text-2xl font-semibold`}>
                  Note
                </h3>
              </Label>
              <Input
                value={product.note}
                id="search"
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
            className={`grid grid-row-2 w-full gap-2 lg:gap-5 p-3 border border-muted-foreground/30  `}
          >
            <div
              className={`grid grid-cols-[1fr_auto] w-full gap-3 p-1 lg:p-3 border border-muted-foreground/50 rounded-t-lg`}
            >
              <div
                className={` flex justify-start items-center flex-wrap gap-1`}
              >
                {addOns
                  .filter((addOn) => addOn.selectedOption > 0) // Filter out add-ons with selectedOption <= 0
                  .map((addOn, addOnIndex) => (
                    <Badge
                      key={addOnIndex}
                      className=" bg-muted-foreground rounded-b-none lg:text-xl font-medium"
                    >
                      {" "}
                      +{addOn.selectedOption * addOn.price.value} {addOn.name}{" "}
                    </Badge> // Render Badge for each selected add-on
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

            <div className={`grid grid-cols-2 w-full gap-2 lg:gap-5 `}>
              <DialogTrigger>
                <Button
                  variant={"outline"}
                  className="w-full rounded-t-none lg:h-20 lg:text-3xl lg:p-8"
                >
                  Back
                </Button>
              </DialogTrigger>

              <Button
                className=" text-primary-foreground rounded-t-none lg:h-20 lg:text-3xl lg:p-8"
                disabled={error}
                onClick={addToCart}
              >
                <span className="w-full text-left">Add to cart </span>
                {getTotalPrice()} {variantOptions.price.currency}
                <ArrowRight className="lg:!size-8" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCard;
