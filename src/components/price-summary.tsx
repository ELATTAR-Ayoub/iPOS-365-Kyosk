import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const PriceSummary = () => {
  const cartPriceSummary = useSelector(
    (state: RootState) => state.cart.cartPriceSummary
  );
  const products = useSelector((state: RootState) => state.cart.products);

  return (
    <div className="w-full shrink-0">
      <section
        className={`w-full p-1 space-y-2 rounded-lg border border-muted`}
      >
        {/* price recue */}
        <div
          className={`w-full p-2 space-y-2 kiosk:space-y-4 bg-sidebar rounded-md text-muted-foreground text-sm kiosk:text-2xl font-semibold`}
        >
          <div className={`flex justify-between items-center`}>
            <p>Sub Total ({products.length})</p>
            <p>
              {cartPriceSummary.currency} {cartPriceSummary.subTotal}
            </p>
          </div>

          <div className={`flex justify-between items-center`}>
            <p>Discount</p>
            <p>{cartPriceSummary.Discount}%</p>
          </div>

          <div className={`flex justify-between items-center`}>
            <p>Service Tax </p>
            <p>{cartPriceSummary.currency} 10.00</p>
          </div>

          {/* separator */}
          <div
            className={`w-full h-[1px] border-t-2 border-dashed border-muted`}
          ></div>

          <div
            className={`flex justify-between items-center text-sm kiosk:text-3xl font-bold text-primary`}
          >
            <p>Total Payment</p>
            <p>
              {cartPriceSummary.currency} {cartPriceSummary.TotalPay}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
