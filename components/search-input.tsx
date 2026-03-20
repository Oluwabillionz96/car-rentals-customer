import { Search, X } from "lucide-react";
import Input from "./input";
import { Dispatch, SetStateAction } from "react";

const SearchInput = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="w-full md:w-1/2">
      <div className="relative">
        <Input
          placeholder="Search by car name or type"
          icon={Search}
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary disabled:text-primary/50 disabled:cursor-not-allowed"
            onClick={() => setSearchQuery("")}
          >
            <X />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
