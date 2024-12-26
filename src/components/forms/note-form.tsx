import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import styles from "@/styles";

export function NoteForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <Label
        htmlFor="search"
        className={` ${styles.small} font-semibold block w-full text-left`}
      >
        Note
      </Label>
      <Input id="search" placeholder="Any notes?" className="h-10" />
    </form>
  );
}
