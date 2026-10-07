import { useState, useEffect } from 'react';
import {
  ClubInfo,
  Player,
  OfficialStaff,
  Match,
  StandingTeam,
  NewsArticle,
  GalleryItem,
  SupporterMessage,
  initialClubInfo,
  initialPlayers,
  initialStaff,
  initialMatches,
  initialStandings,
  initialNews,
  initialGallery,
  initialSupporterMessages
} from './clubData';

const STORAGE_KEY = 'psn_ngada_club_db_v7_empty_all';

export interface ClubDatabase {
  clubInfo: ClubInfo;
  players: Player[];
  staff: OfficialStaff[];
  matches: Match[];
  standings: StandingTeam[];
  news: NewsArticle[];
  gallery: GalleryItem[];
  supporterMessages: SupporterMessage[];
}

const getDefaultDatabase = (): ClubDatabase => ({
  clubInfo: initialClubInfo,
  players: initialPlayers,
  staff: initialStaff,
  matches: initialMatches,
  standings: initialStandings,
  news: initialNews,
  gallery: initialGallery,
  supporterMessages: initialSupporterMessages
});

export function useClubStore() {
  const [data, setData] = useState<ClubDatabase>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return getDefaultDatabase();
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }, [data]);

  // Methods to update state
  const updateClubInfo = (updated: Partial<ClubInfo>) => {
    setData(prev => ({
      ...prev,
      clubInfo: { ...prev.clubInfo, ...updated }
    }));
  };

  const addPlayer = (player: Player) => {
    setData(prev => ({
      ...prev,
      players: [player, ...prev.players]
    }));
  };

  const updatePlayer = (id: string, updated: Partial<Player>) => {
    setData(prev => ({
      ...prev,
      players: prev.players.map(p => p.id === id ? { ...p, ...updated } : p)
    }));
  };

  const deletePlayer = (id: string) => {
    setData(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== id)
    }));
  };

  const updateStaff = (id: string, updated: Partial<OfficialStaff>) => {
    setData(prev => ({
      ...prev,
      staff: prev.staff.map(s => s.id === id ? { ...s, ...updated } : s)
    }));
  };

  const addMatch = (match: Match) => {
    setData(prev => ({
      ...prev,
      matches: [match, ...prev.matches]
    }));
  };

  const updateMatch = (id: string, updated: Partial<Match>) => {
    setData(prev => ({
      ...prev,
      matches: prev.matches.map(m => m.id === id ? { ...m, ...updated } : m)
    }));
  };

  const deleteMatch = (id: string) => {
    setData(prev => ({
      ...prev,
      matches: prev.matches.filter(m => m.id !== id)
    }));
  };

  const updateStanding = (club: string, updated: Partial<StandingTeam>) => {
    setData(prev => ({
      ...prev,
      standings: prev.standings.map(s => s.club === club ? { ...s, ...updated } : s)
    }));
  };

  const addNews = (article: NewsArticle) => {
    setData(prev => ({
      ...prev,
      news: [article, ...prev.news]
    }));
  };

  const updateNews = (id: string, updated: Partial<NewsArticle>) => {
    setData(prev => ({
      ...prev,
      news: prev.news.map(n => n.id === id ? { ...n, ...updated } : n)
    }));
  };

  const deleteNews = (id: string) => {
    setData(prev => ({
      ...prev,
      news: prev.news.filter(n => n.id !== id)
    }));
  };

  const addGalleryItem = (item: GalleryItem) => {
    setData(prev => ({
      ...prev,
      gallery: [item, ...prev.gallery]
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setData(prev => ({
      ...prev,
      gallery: prev.gallery.filter(g => g.id !== id)
    }));
  };

  const addSupporterMessage = (name: string, location: string, message: string) => {
    const newMessage: SupporterMessage = {
      id: `sm-${Date.now()}`,
      name: name.trim() || 'Pendukung Setia',
      location: location.trim() || 'Ngada, NTT',
      message: message.trim(),
      timestamp: 'Baru saja',
      likes: 1
    };
    setData(prev => ({
      ...prev,
      supporterMessages: [newMessage, ...prev.supporterMessages]
    }));
  };

  const likeSupporterMessage = (id: string) => {
    setData(prev => ({
      ...prev,
      supporterMessages: prev.supporterMessages.map(m =>
        m.id === id ? { ...m, likes: m.likes + 1 } : m
      )
    }));
  };

  const resetToDefault = () => {
    const defaultData = getDefaultDatabase();
    setData(defaultData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    } catch {
      // ignore
    }
  };

  const clearAllData = () => {
    setData(prev => ({
      ...prev,
      players: [],
      staff: [],
      matches: [],
      standings: [],
      news: [],
      gallery: [],
      supporterMessages: []
    }));
  };

  const importData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.clubInfo && parsed.players && parsed.matches) {
        setData(parsed);
        return true;
      }
    } catch {
      return false;
    }
    return false;
  };

  return {
    ...data,
    updateClubInfo,
    addPlayer,
    updatePlayer,
    deletePlayer,
    updateStaff,
    addMatch,
    updateMatch,
    deleteMatch,
    updateStanding,
    addNews,
    updateNews,
    deleteNews,
    addGalleryItem,
    deleteGalleryItem,
    addSupporterMessage,
    likeSupporterMessage,
    resetToDefault,
    clearAllData,
    importData
  };
}
