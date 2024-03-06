import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectDropdownProps {
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
  label: string;
  getSelectedValue: (value: string) => void;
}

export function SelectDropdown({
  placeholder,
  options,
  label,
  getSelectedValue,
}: SelectDropdownProps) {
  return (
    <Select onValueChange={(value) => getSelectedValue(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
