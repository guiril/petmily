export interface VenueLocation {
  lat: number;
  lng: number;
}

export type CityKey = 'taichung' | 'taipei' | 'kaohsiung';

export interface Venue {
  id: string;
  name: string;
  address: string;
  district: string;
  city: CityKey;
  serviceType: string[];
  petType: string[];
  phone?: string;
  location?: VenueLocation;
  imageUrl?: string;
}

export type RawVenue = Omit<Venue, 'city'>;

export interface VenuesData {
  updatedAt: number;
  venues: {
    taichung: RawVenue[];
    taipei?: RawVenue[];
    kaohsiung?: RawVenue[];
  };
}
