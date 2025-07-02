export interface Course {
  id: number;
  title: string;
  category: 'teh' | 'kopi' | 'herbal';
  description: string;
  duration: string; // e.g., "2 jam"
  level: 'pemula' | 'menengah' | 'lanjutan';
  imageUrl?: string;
}