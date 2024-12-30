import { useState } from "react";

// constants
import { Product } from "@/constants/interfaces";

import { products as allProducts } from "@/constants/index";

import ProductCustomizationDialog from "./product-customization-dialog";
import { Button } from "./ui/button";
import styles from "@/styles";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// ProductCard component
const ProductCard = ({ product }: { product: Product }) => {
  // redux
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mode] = useState<"edit" | "add">("add");

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const products = useSelector((state: RootState) => state.cart.products);

  const handleAddToCart = () => {
    handleCloseDialog();
  };

  return (
    <div className={`relative h-fit rounded-xl w-[48%] sm:w-40 kiosk:w-auto `}>
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
            variant={
              products.find((p) => p.title === product.title)
                ? "default"
                : "muted"
            }
            onClick={() => setIsDialogOpen(true)}
            className=" text-primary-foreground rounded-full z-20 hover:-rotate-12 lg:w-12 lg:h-12 "
            size="icon"
          >
            {" "}
            <Plus className=" size-4 lg:!size-5" />
          </Button>
        </div>
      </div>

      {/* add popup use */}

      <ProductCustomizationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        product={product}
        products={allProducts} // You need to provide the products array
        mode={mode}
        onSubmit={handleAddToCart}
      />
    </div>
  );
};

export default ProductCard;
