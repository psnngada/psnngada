import officialLogoAsset from '../assets/images/logo_psn_ngada.jpg';

export interface Player {
  id: string;
  number: number;
  name: string;
  position: 'Penjaga Gawang' | 'Bek' | 'Gelandang' | 'Penyerang';
  positionDetail: string;
  birthDate: string;
  height: string;
  weight: string;
  foot: 'Kanan' | 'Kiri' | 'Keduanya';
  hometown: string;
  caps: number;
  goals: number;
  assists: number;
  cleanSheets?: number;
  yellowCards: number;
  redCards: number;
  photoUrl?: string;
  isCaptain?: boolean;
}

export interface OfficialStaff {
  id: string;
  role: string;
  name: string;
  nationality: string;
  experience: string;
  license?: string;
  photoUrl?: string;
}

export interface Match {
  id: string;
  opponent: string;
  opponentLogo: string;
  homeOrAway: 'HOME' | 'AWAY';
  date: string;
  time: string;
  stadium: string;
  competition: string;
  round: string;
  status: 'Akan Datang' | 'Live' | 'Selesai';
  psnScore?: number;
  opponentScore?: number;
  scorers?: string[];
  reportSummary?: string;
}

export interface StandingTeam {
  pos: number;
  club: string;
  isPsn: boolean;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Tim' | 'Pertandingan' | 'Liga 3' | 'Transfer' | 'Latihan' | 'Klub';
  date: string;
  author: string;
  summary: string;
  content: string;
  imageUrl: string;
  readTime: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Pertandingan' | 'Latihan' | 'Pemain' | 'Supporter' | 'Perjalanan Tim';
  date: string;
  imageUrl: string;
  caption: string;
}

export interface SupporterMessage {
  id: string;
  name: string;
  location: string;
  message: string;
  timestamp: string;
  likes: number;
}

export interface ClubInfo {
  name: string;
  fullName: string;
  nickname: string;
  foundedYear: string;
  city: string;
  province: string;
  competition: string;
  season: string;
  homeStadium: string;
  stadiumCapacity: string;
  colors: string;
  crestUrl: string;
  heroImageUrl: string;
  stadiumImageUrl: string;
  supportersImageUrl: string;
  motto: string;
  description: string;
  philosophy: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    whatsapp: string;
  };
  contact: {
    address: string;
    email: string;
    phone: string;
  };
}

export const initialClubInfo: ClubInfo = {
  name: "PSN NGADA",
  fullName: "Perserikatan Sepakbola Ngada",
  nickname: "Laskar Jaramasi",
  foundedYear: "-",
  city: "Kabupaten Ngada (Bajawa)",
  province: "Nusa Tenggara Timur, Indonesia",
  competition: "Liga 3 Nasional",
  season: "2026/2027",
  homeStadium: "-",
  stadiumCapacity: "-",
  colors: "Oranye - Hitam - Hijau - Putih",
  crestUrl: officialLogoAsset,
  heroImageUrl: "/src/assets/images/hero_football_action_1791357749455.jpg",
  stadiumImageUrl: "/src/assets/images/ngada_stadium_landscape_1791357937360.jpg",
  supportersImageUrl: "/src/assets/images/passionate_supporters_crowd_1791354306155.jpg",
  motto: "Membawa semangat Ngada, menjaga kebanggaan Nusa Tenggara Timur, dan berjuang menuju prestasi nasional.",
  description: "PSN Ngada merupakan klub sepak bola yang membawa nama Ngada dan Nusa Tenggara Timur. Dengan semangat, kerja keras, kebersamaan, dan dukungan masyarakat, PSN Ngada berjuang memberikan prestasi terbaik di kancah sepak bola nasional.",
  philosophy: "Terinspirasi dari kegigihan tarian Ja'i dan keteguhan Gunung Inerie, PSN Ngada mengusung sepak bola kolektif dengan determinasi tinggi, disiplin taktis, serta sportivitas tanpa kompromi.",
  socialLinks: {
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    whatsapp: ""
  },
  contact: {
    address: "Kabupaten Ngada, Nusa Tenggara Timur",
    email: "-",
    phone: "-"
  }
};

// Data dikosongkan sesuai instruksi pengguna
export const initialPlayers: Player[] = [];

export const initialStaff: OfficialStaff[] = [];

export const initialMatches: Match[] = [];

export const initialStandings: StandingTeam[] = [];

export const initialNews: NewsArticle[] = [];

export const initialGallery: GalleryItem[] = [];

export const initialSupporterMessages: SupporterMessage[] = [];
