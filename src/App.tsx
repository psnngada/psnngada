import React, { useState } from 'react';
import { useClubStore } from './data/useClubStore';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NextMatchBanner } from './components/NextMatchBanner';
import { AboutSection } from './components/AboutSection';
import { NewsSection } from './components/NewsSection';
import { SquadSection } from './components/SquadSection';
import { StaffSection } from './components/StaffSection';
import { MatchesSection } from './components/MatchesSection';
import { StandingsSection } from './components/StandingsSection';
import { TeamStatsSection } from './components/TeamStatsSection';
import { GallerySection } from './components/GallerySection';
import { SupporterSection } from './components/SupporterSection';
import { SocialSection } from './components/SocialSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SupportModal } from './components/SupportModal';
import { AdminModal } from './components/AdminModal';
import { Bell } from 'lucide-react';

export default function App() {
  const store = useClubStore();

  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const nextMatch = store.matches.find((m) => m.status === 'Akan Datang');
  const psnStanding = store.standings.find((s) => s.isPsn);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 bg-zinc-900 border border-red-600/80 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-in slide-in-from-top-2 duration-200">
          <Bell className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Top Navbar */}
      <Navbar
        clubInfo={store.clubInfo}
        onOpenSupport={() => setSupportModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero clubInfo={store.clubInfo} />

        {/* Next Match Fixture Banner */}
        <NextMatchBanner
          match={nextMatch}
          clubInfo={store.clubInfo}
          onOpenReminderToast={() => showToast('Pengingat jadwal pertandingan berhasil diaktifkan!')}
        />

        {/* Profil Klub */}
        <AboutSection
          clubInfo={store.clubInfo}
          onOpenSupport={() => setSupportModalOpen(true)}
        />

        {/* Berita Terbaru */}
        <NewsSection news={store.news} />

        {/* Skuad Pemain */}
        <SquadSection players={store.players} />

        {/* Pelatih dan Staff */}
        <StaffSection staff={store.staff} />

        {/* Jadwal dan Hasil Pertandingan */}
        <MatchesSection
          matches={store.matches}
          clubInfo={store.clubInfo}
        />

        {/* Klasemen Liga 3 Nasional */}
        <StandingsSection
          standings={store.standings}
          clubInfo={store.clubInfo}
        />

        {/* Dashboard Statistik Tim & Pemain */}
        <TeamStatsSection
          players={store.players}
          psnStanding={psnStanding}
        />

        {/* Galeri Klub */}
        <GallerySection gallery={store.gallery} />

        {/* Supporter Section */}
        <SupporterSection
          clubInfo={store.clubInfo}
          messages={store.supporterMessages}
          onAddMessage={store.addSupporterMessage}
          onLikeMessage={store.likeSupporterMessage}
          onOpenSupport={() => setSupportModalOpen(true)}
        />

        {/* Media Sosial */}
        <SocialSection clubInfo={store.clubInfo} />

        {/* Sekretariat & Kontak */}
        <ContactSection clubInfo={store.clubInfo} />
      </main>

      {/* Footer */}
      <Footer
        clubInfo={store.clubInfo}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Modals */}
      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
        clubInfo={store.clubInfo}
      />

      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        clubInfo={store.clubInfo}
        players={store.players}
        matches={store.matches}
        standings={store.standings}
        onUpdateClubInfo={store.updateClubInfo}
        onAddPlayer={store.addPlayer}
        onUpdatePlayer={store.updatePlayer}
        onDeletePlayer={store.deletePlayer}
        onUpdateMatch={store.updateMatch}
        onUpdateStanding={store.updateStanding}
        onResetToDefault={store.resetToDefault}
        onClearAllData={store.clearAllData}
        onImportData={store.importData}
        fullDataJson={JSON.stringify(
          {
            clubInfo: store.clubInfo,
            players: store.players,
            staff: store.staff,
            matches: store.matches,
            standings: store.standings,
            news: store.news,
            gallery: store.gallery,
            supporterMessages: store.supporterMessages,
          },
          null,
          2
        )}
      />
    </div>
  );
}
