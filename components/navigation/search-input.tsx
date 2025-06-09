"use client";

import { Input } from "@heroui/input";
import { SearchIcon } from "../ui/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchInput: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/search/${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={handleSearch}
    />
  );
};

export default SearchInput;
