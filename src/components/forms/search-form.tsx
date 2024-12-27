import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form className=" relative w-full " {...props}>
      <Label htmlFor="search" className="sr-only">
        Search Products
      </Label>
      <Input
        id="search"
        placeholder="Search something"
        className="pl-8 h-12 xl:h-16 xl:text-xl"
      />
      <Search className="pointer-events-none relative left-1 bottom-8 xl:bottom-10 h-4 aspect-square select-none opacity-50 " />
    </form>
  );
}
