"use client";

import { useMemo, useState } from "react";
// styles
import styles from "@/styles";

// constants
import { Product } from "@/constants/interfaces";

// redux
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

// compo
import ProductCard from "@/components/product-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { products } from "@/constants/index";

interface ProductCards {
  selectedCategorie: string;
  showMenuData?: boolean;
  centerMenuItems?: boolean;
}

const ProductCards: React.FC<ProductCards> = ({
  selectedCategorie,
  showMenuData = true,
  centerMenuItems = false,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [toggleVegan, setToggleVegan] = useState(false);
  const menuSearch = useSelector(
    (state: RootState) => state.UIConfig.menuSearch
  );

  useMemo(() => {
    let filtered: Product[] = [];

    // filter customisable
    filtered = products.filter((product) => product.customisable === true);

    // Apply search filter
    if (menuSearch.trim()) {
      const searchQuery = menuSearch.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery)
      );
    }

    // filter selectedCategorie
    if (selectedCategorie !== "all menu") {
      filtered = filtered.filter((product) =>
        product.categories.includes(selectedCategorie)
      );
    }

    // Apply vegan filter
    if (toggleVegan) {
      filtered = filtered.filter((product) => product.isVegan === true);
    }

    // Finish
    setFilteredProducts(filtered);
  }, [selectedCategorie, menuSearch, toggleVegan]); // Added toggleVegan to dependencies

  const handleVeganToggle = (checked: boolean) => {
    setToggleVegan(checked);
  };

  return (
    <section
      className={`${styles.flexStart} flex-col relative w-full gap-3 overflow-hidden`}
    >
      {showMenuData && (
        <div className={`${styles.flexBetween} w-full`}>
          <h1
            className={`${styles.normal} kiosk:text-2xl font-bold capitalize`}
          >
            {selectedCategorie}
          </h1>
          <div
            className={`${styles.flexCenter} gap-4 ${styles.Xsmall} kiosk:text-lg text-muted-foreground`}
          >
            <p>
              {filteredProducts.length}{" "}
              {selectedCategorie !== "all menu" ? selectedCategorie : "total"}{" "}
              results
            </p>

            <form className="flex flex-row items-center justify-between gap-1 kiosk:gap-2">
              <Switch
                checked={toggleVegan}
                onCheckedChange={handleVeganToggle}
              />
              <Label className={`${styles.Xsmall} kiosk:text-lg`}>Vegan</Label>
            </form>
          </div>
        </div>
      )}

      <div
        className={`kiosk:grid kiosk:grid-cols-4 flex ${
          centerMenuItems
            ? "justify-center items-center"
            : "justify-start items-start"
        } flex-wrap relative w-full gap-3 kiosk:gap-14 overflow-y-auto pb-6 kiosk:pb-10 pt-6 kiosk:pt-16 border-t border-muted overflow-x-hidden`}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <div className="grid col-span-8 place-content-center w-full h-full">
            <p
              className={`${styles.Xsmall} kiosk:text-lg text-primary/70 w-full text-center mt-11`}
            >
              No more products under this category, please check other
              categories.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCards;
