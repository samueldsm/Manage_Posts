import React, { Dispatch, SetStateAction } from "react";

import { Input } from "@nextui-org/input";

import { SearchIcon } from "@/components/icons/search_icon";

export default function Search({
  setPage,
  filterValue,
  setFilterValue,
  onSearchChange,
}: {
  page: number;
  setPage: (value: number) => void;
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
  onSearchChange: (value?: string) => void;
}) {
  return (
 
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "border-1",
          }}
          size="sm"
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          placeholder="Search by title..."
          startContent={<SearchIcon className="text-default-300" />}
          onValueChange={onSearchChange}
        />
   
  );
}
