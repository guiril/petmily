export interface VenueLocation {
  lat: number;
  lng: number;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  district: string;
  serviceType: string[];
  petType: string[];
  phone?: string;
  location?: VenueLocation;
}

export interface VenuesData {
  updatedAt: number;
  venues: {
    taichung: Venue[];
  };
}

export type CityKey = keyof VenuesData['venues'];
