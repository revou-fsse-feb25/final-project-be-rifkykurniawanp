import { Course } from './course.interface';


export const courses: Course[] = [
  {
    id: 1,
    title: 'Dasar-Dasar Teh Hijau',
    category: 'teh',
    description:
      'Pelajari sejarah, jenis, dan cara penyajian teh hijau yang baik untuk kesehatan.',
    duration: '1.5 jam',
    level: 'pemula',
    imageUrl: '/images/teh-hijau.jpg',
  },
  {
    id: 2,
    title: 'Seni Meracik Teh Tradisional',
    category: 'teh',
    description:
      'Mengenal teknik meracik teh dari berbagai budaya Asia, mulai dari Jepang hingga Indonesia.',
    duration: '2 jam',
    level: 'menengah',
    imageUrl: '/images/racikan-teh.jpg',
  },
  {
    id: 3,
    title: 'Kopi Arabika dan Robusta: Panduan Lengkap',
    category: 'kopi',
    description:
      'Membedakan karakteristik kopi Arabika dan Robusta, termasuk teknik penyeduhan terbaik.',
    duration: '2.5 jam',
    level: 'pemula',
    imageUrl: '/images/kopi-arabika.jpg',
  },
  {
    id: 4,
    title: 'Latihan Cupping Kopi Profesional',
    category: 'kopi',
    description:
      'Belajar mencicipi kopi seperti seorang barista profesional menggunakan metode cupping.',
    duration: '1 jam',
    level: 'lanjutan',
    imageUrl: '/images/cupping-kopi.jpg',
  },
  {
    id: 5,
    title: 'Penggunaan Herbal dalam Pengobatan Tradisional',
    category: 'herbal',
    description:
      'Eksplorasi berbagai tanaman herbal yang digunakan dalam pengobatan tradisional dan cara penggunaannya.',
    duration: '3 jam',
    level: 'menengah',
    imageUrl: '/images/herbal-tradisional.jpg',
  },
  {
    id: 6,
    title: 'Budidaya Tanaman Herbal di Rumah',
    category: 'herbal',
    description:
      'Panduan praktis membudidayakan tanaman herbal seperti jahe, serai, dan daun mint di rumah.',
    duration: '1.5 jam',
    level: 'pemula',
    imageUrl: '/images/budidaya-herbal.jpg',
  },
];
