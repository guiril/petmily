export interface FilterState {
  serviceTypes: Set<string>;
  petTypes: Set<string>;
  districts: Set<string>;
}

export interface FilterCategory {
  key: keyof FilterState;
  title: string;
  options: string[];
}
