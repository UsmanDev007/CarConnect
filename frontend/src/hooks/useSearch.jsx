import { useState, useMemo } from "react";
import { useDebounce } from "use-debounce";

export const useSearch = (data = []) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);

  const filterCars = useMemo(() => {
    if (!debouncedSearch) return data;
    const search = debouncedSearch.toLowerCase();
    return data.filter(
      item =>
        (item.brand?.toLowerCase().includes(search)) ||
        (item.model?.toLowerCase().includes(search))
    );
  }, [data, debouncedSearch]);

  return { searchTerm, setSearchTerm, filterCars };
};
