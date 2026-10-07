import React from 'react';
import { Share2, ExternalLink } from 'lucide-react';
import { ClubInfo } from '../data/clubData';

interface SocialSectionProps {
  clubInfo: ClubInfo;
}

export const SocialSection: React.FC<SocialSectionProps> = ({ clubInfo }) => {
  const socials = [
    {
      name: 'Instagram',
      handle: '@psnngada_official',
      url: clubInfo.socialLinks.instagram,
      color: 'hover:border-pink-500 hover:text-pink-400',
      badge: 'Instagram Resmi',
    },
    {
      name: 'Facebook',
      handle: 'PSN Ngada Official',
      url: clubInfo.socialLinks.facebook,
      color: 'hover:border-blue-500 hover:text-blue-400',
      badge: 'Komunitas & Info',
    },
    {
      name: 'TikTok',
      handle: '@psnngada',
      url: clubInfo.socialLinks.tiktok,
      color: 'hover:border-cyan-400 hover:text-cyan-300',
      badge: 'Highlight & Skill',
    },
    {
      name: 'YouTube',
      handle: 'PSN Ngada TV',
      url: clubInfo.socialLinks.youtube,
      color: 'hover:border-red-600 hover:text-red-500',
      badge: 'Video Matchday',
    },
    {
      name: 'WhatsApp Channel',
      handle: 'Kanal Berita PSN',
      url: clubInfo.socialLinks.whatsapp,
      color: 'hover:border-emerald-500 hover:text-emerald-400',
      badge: 'Info Cepat',
    },
  ];

  return (
    <section className="py-16 bg-zinc-900/60 border-t border-zinc-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-red-500 mb-2">
            KOMUNITAS DIGITAL
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight uppercase">
            IKUTI PERJUANGAN KAMI
          </h2>
          <div className="w-12 h-1 bg-red-600 mt-3 rounded-full" />
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-lg">
            Dapatkan informasi tercepat tentang susunan pemain, siaran langsung, dan kabar internal PSN Ngada.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {socials.map((soc) => (
            <a
              key={soc.name}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-xl bg-zinc-950 border border-zinc-800 transition-all duration-200 group flex flex-col justify-between ${soc.color}`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span className="text-[10px] font-semibold uppercase">{soc.badge}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-display font-bold text-base text-white group-hover:translate-x-0.5 transition-transform">
                  {soc.name}
                </h4>
              </div>

              <div className="mt-4 pt-2 border-t border-zinc-900 text-xs text-zinc-400 truncate font-mono">
                {soc.handle}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
