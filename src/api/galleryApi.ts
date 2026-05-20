import { GALLERY_ITINERARY, GALLERY_PARTY, GALLERY_HOTEL, GALLERY_BEACH, GALLERY_NATURE } from '../assets/localImages';

export interface GalleryItem {
  id: string;
  url: string;
  likes: number;
  comments: number;
  category: string;
}

const INITIAL_PHOTOS: GalleryItem[] = [
  { id: '1', url: GALLERY_ITINERARY, likes: 42, comments: 5, category: 'itinerary' },
  { id: '2', url: GALLERY_PARTY, likes: 89, comments: 12, category: 'party' },
  { id: '3', url: GALLERY_HOTEL, likes: 15, comments: 2, category: 'hotel' },
  { id: '4', url: GALLERY_BEACH, likes: 56, comments: 8, category: 'beach' },
  { id: '5', url: GALLERY_NATURE, likes: 34, comments: 3, category: 'nature' }
];

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return INITIAL_PHOTOS;
}

export async function uploadGalleryFile(file: File): Promise<GalleryItem> {
  // Simulate uploading file by converting to object URL for local previewing
  const objectUrl = URL.createObjectURL(file);
  return {
    id: String(Date.now()),
    url: objectUrl,
    likes: 0,
    comments: 0,
    category: 'all'
  };
}
