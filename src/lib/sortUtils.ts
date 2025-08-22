import { Client, SortCriteria } from "@/types/client";

export function multiSort(data: Client[], criteria: SortCriteria[]): Client[] {
  const dataCopy = [...data];

  return dataCopy.sort((a, b) => {
    for (const { key, direction } of criteria) {
      const aVal = a[key] as unknown as string | number;
      const bVal = b[key] as unknown as string | number;
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
}
