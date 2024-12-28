import { CartProduct } from "@/constants/interfaces";
import { useMemo, useState } from "react";

interface PriceSummaryProps {
  products: CartProduct[];
  discount: number;
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  products,
  discount,
}) => {
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
    <div className="w-full shrink-0">
      <section
        className={`w-full p-1 space-y-2 rounded-lg border border-muted`}
      >
        {/* price recue */}
        <div
          className={`w-full p-2 space-y-2 lg:space-y-4 bg-sidebar rounded-md text-muted-foreground text-sm lg:text-2xl font-semibold`}
        >
          <div className={`flex justify-between items-center`}>
            <p>Sub Total ({products.length})</p>
            <p>
              {currency} {totalPrice}
            </p>
          </div>

          <div className={`flex justify-between items-center`}>
            <p>Discount</p>
            <p>{discount}%</p>
          </div>

          <div className={`flex justify-between items-center`}>
            <p>Service Tax </p>
            <p>{currency} 10.00</p>
          </div>

          {/* separator */}
          <div
            className={`w-full h-[1px] border-t-2 border-dashed border-muted`}
          ></div>

          <div
            className={`flex justify-between items-center text-sm lg:text-3xl font-bold text-primary`}
          >
            <p>Total Payment</p>
            <p>
              {currency} {totalPrice + 10}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
