import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavList from "./nav-list";
import { Dropdown } from "./ui/dropdown";

export function MobileNav({
  children,
  options,
}: {
  children: React.ReactNode;
  options: any;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <div className="flex justify-center">
          <ul className="flex flex-col items-center gap-y-10">
            <Dropdown options={options} placeholder="Search stores" />
            <NavList />
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
