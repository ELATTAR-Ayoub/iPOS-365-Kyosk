import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";

// redux
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setMenuSearch } from "@/store/UIConfig";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const dispatch = useDispatch();
  const menuSearch = useSelector(
    (state: RootState) => state.UIConfig.menuSearch
  );
  return (
    <form className=" relative w-full " {...props}>
      <Label htmlFor="search" className="sr-only">
        Search Products
      </Label>
      <Input
        value={menuSearch}
        id="search"
        placeholder="Search something"
        className="pl-8 h-12 kiosk:h-16 kiosk:text-xl"
        onChange={(e) => {
          dispatch(setMenuSearch(e.target.value));
        }}
      />
      <Search className="pointer-events-none relative left-1 bottom-8 kiosk:bottom-10 h-4 aspect-square select-none opacity-50 " />
    </form>
  );
}
