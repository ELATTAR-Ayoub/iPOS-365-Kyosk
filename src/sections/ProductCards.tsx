"use client";

// styles
// import styles from "@/styles/index";

// constants
import { Product } from "@/constants/interfaces";

// redux
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

// compo
import ProductCard from "@/components/product-card";
import styles from "@/styles";
import { useMemo, useState } from "react";

import { products } from "@/constants/index";

// Icons

// components

interface ProductCards {
  selectedCategorie: string; // Parameter to define the category
  showMenuData?: boolean; // toggle to show menu data
}

const ProductCards: React.FC<ProductCards> = ({
  selectedCategorie,
  showMenuData = true,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const menuSearch = useSelector(
    (state: RootState) => state.UIConfig.menuSearch
  );

  useMemo(() => {
    let filtered: Product[] = [];

    // filter customisable
    filtered = products.filter((product) => product.customisable === true);
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

    // Finish
    setFilteredProducts(filtered);
  }, [selectedCategorie, menuSearch]);

  return (
    <section
      className={`${styles.flexStart} flex-col relative w-full gap-3 overflow-hidden `}
    >
      {showMenuData && (
        <div className={`${styles.flexBetween} w-full`}>
          <h1 className={`${styles.normal} lg:text-2xl font-bold capitalize`}>
            {selectedCategorie}
          </h1>
          <p className={`${styles.Xsmall} lg:text-lg text-muted-foreground`}>
            {filteredProducts.length}{" "}
            {selectedCategorie !== "all menu" ? selectedCategorie : "total"}{" "}
            results
          </p>
        </div>
      )}

      <div
        className={` kiosk:grid kiosk:grid-cols-4 flex justify-start items-start flex-wrap relative w-full gap-3 lg:gap-14 overflow-y-auto pb-6 lg:pb-10 pt-6 lg:pt-16 border-t border-muted overflow-x-hidden `}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <div className="grid col-span-8 place-content-center w-full h-full">
            <p
              className={` ${styles.Xsmall} lg:text-lg text-primary/70 w-full text-center mt-11`}
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
