export type Client = {
  id: number;
  name: string;
  type: "Individual" | "Company";
  email: string;
  createdAt: string;
  updatedAt: string;
  updatedBy?: string;
  status: "Active" | "Inactive";
};

export type SortDirection = "asc" | "desc";

export type SortCriteria = {
  id: string;
  key: keyof Client;
  label: string;
  direction: SortDirection;
};
