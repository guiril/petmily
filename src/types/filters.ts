export interface FilterState {
  serviceTypes: Set<string>;
  petTypes: Set<string>;
}

export interface FilterOption {
  key: string;
  name: string;
  iconSrc?: string;
}

export interface FilterCategory {
  key: keyof FilterState;
  title: string;
  options: FilterOption[];
}
