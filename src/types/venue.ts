import { CITIES } from '@/lib/cities';

interface VenueLocation {
  lat: number;
  lng: number;
}

export type CityKey = (typeof CITIES)[number]['key'];

export interface Venue {
  id: string;
  name: string;
  address: string;
  district: string;
  city: CityKey;
  serviceTypes: string[];
  petTypes: string[];
  phone?: string;
  location?: VenueLocation;
  imageUrl?: string;
}

export type RawVenue = Omit<Venue, 'city' | 'petTypes'> & {
  petTypes?: string[];
};

export interface VenuesData {
  updatedAt: number;
  venues: {
    taichung: RawVenue[];
    taipei: RawVenue[];
    kaohsiung?: RawVenue[];
  };
}
