export interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  description: string;
  type: 'itinerary' | 'hotel' | 'attraction' | 'dining';
  icon?: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  title: string;
  activities: Activity[];
  tags?: string[];
  image?: string;
  icon?: string;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  phone: string;
  avatar: string;
  type: 'lead' | 'admin' | 'member';
}

export interface Attraction {
  id: string;
  title: string;
  rating: number;
  duration: string;
  description: string;
  image: string;
  packingList: string[];
  type: 'water' | 'nature' | 'culture';
}

export interface Restaurant {
    id: string;
    name: string;
    rating: number;
    description: string;
    image: string;
    dist: string;
    type: 'seafood' | 'street' | 'coffee';
    tags: string[];
}
