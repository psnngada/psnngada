import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Settings, Heart } from 'lucide-react';
import { ClubInfo } from '../data/clubData';
import { OfficialClubLogo } from './OfficialClubLogo';

interface NavbarProps {
  clubInfo: ClubInfo;
  onOpenSupport: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ clubInfo, onOpenSupport, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'PROFIL', href: '#profil' },
    { label: 'BERITA', href: '#berita' },
    { label: 'TIM', href: '#tim' },
    { label: 'JADWAL', href: '#jadwal' },
    { label: 'HASIL', href: '#hasil' },
    { label: 'KLASEMEN', href: '#klasemen' },
    { label: 'GALERI', href: '#galeri' },
    { label: 'KONTAK', href: '#kontak' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/40'
          : 'bg-gradient-to-b from-zinc-950/90 via-zinc-950/60 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand title & official crest mark */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-orange-500/90 bg-zinc-950 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <OfficialClubLogo customUrl={clubInfo.crestUrl} className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-wider text-white group-hover:text-orange-500 transition-colors">
                {clubInfo.name}
              </span>
              <span className="text-[11px] tracking-widest uppercase text-zinc-400 font-medium">
                {clubInfo.competition}
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:text-white hover:border-b-2 hover:border-red-600 transition-all py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              title="Panel Kelola Data (Admin)"
              aria-label="Panel Kelola Data"
              className="p-2 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenSupport}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md shadow-red-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              DUKUNG PSN NGADA
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSupport}
              className="sm:hidden px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold uppercase tracking-wider rounded-md"
            >
              Dukung
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white bg-zinc-900 rounded-lg border border-zinc-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/98 border-b border-zinc-800 px-5 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2.5 rounded-lg text-xs font-semibold text-zinc-200 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white px-3 py-2 rounded-lg bg-zinc-900 w-full justify-center"
            >
              <Settings className="w-4 h-4" />
              Kelola Data
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSupport();
              }}
              className="flex items-center gap-2 text-xs font-bold text-white px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 w-full justify-center whitespace-nowrap"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              Dukung Klub
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
