"use client";

// styles
import { Button } from "@/components/ui/button";
import styles from "@/styles";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { setProducts, setProductQuantity, addProduct } from "@/store/cart";
import { ShoppingBasket } from "lucide-react";

// Icons

// components
const Menu = () => {
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

    return totalPriceValue;
  }

  return (
    <section
      className={` fixed w-full h-fit ${styles.flexCenter} ${
        styles.xPaddings
      } bottom-0 gap-3 ${products.length == 0 && "hidden"} `}
    >
      <div
        className={` w-full md:w-2/3 ${styles.flexCenter} gap-3 bg-secondary p-2 pb-0 rounded-t-xl`}
      >
        <Button variant={"outline"} className=" w-1/3 rounded-b-none py-6">
          Back
        </Button>

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
      </div>
    </section>
  );
};

export default Menu;
