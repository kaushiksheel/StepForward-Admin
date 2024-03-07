import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
      <SheetContent side="left">
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
