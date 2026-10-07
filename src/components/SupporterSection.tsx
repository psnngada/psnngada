import React, { useState } from 'react';
import { Heart, Send, MapPin, MessageSquare, ThumbsUp } from 'lucide-react';
import { SupporterMessage, ClubInfo } from '../data/clubData';

interface SupporterSectionProps {
  clubInfo: ClubInfo;
  messages: SupporterMessage[];
  onAddMessage: (name: string, location: string, message: string) => void;
  onLikeMessage: (id: string) => void;
  onOpenSupport: () => void;
}

export const SupporterSection: React.FC<SupporterSectionProps> = ({
  clubInfo,
  messages,
  onAddMessage,
  onLikeMessage,
  onOpenSupport,
}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onAddMessage(
      name || 'Pendukung PSN Ngada',
      location || 'Bajawa, NTT',
      message
    );

    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background Graphic Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src={clubInfo.supportersImageUrl}
          alt="Supporters Crowd Atmosphere"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Highlight Container */}
        <div className="bg-gradient-to-r from-red-950/80 via-zinc-900/90 to-red-950/80 border border-red-900/60 rounded-3xl p-8 sm:p-12 text-center shadow-2xl backdrop-blur-md mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-900/50 border border-red-700/60 text-red-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />
            TRIBUN MERAH PUTIH
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
            SATU SEMANGAT, SATU KEBANGGAAN
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            "Perjalanan PSN Ngada tidak hanya milik pemain dan official. Dukungan masyarakat Ngada
            dan seluruh pencinta sepak bola Nusa Tenggara Timur menjadi bagian penting dalam setiap
            perjuangan."
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onOpenSupport}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-red-950/60 transition-transform hover:scale-105 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              DUKUNG PSN NGADA
            </button>
          </div>
        </div>

        {/* Dinding Semangat Suporter: Grid Form & Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Tulis Doa & Semangat */}
          <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-red-500 mb-2">
              <MessageSquare className="w-4 h-4" />
              KIRIM PESAN PENYEMANGAT
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              Dinding Semangat Suporter
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Tuliskan doa, chant, dan kata-kata motivasi untuk skuad PSN Ngada sebelum laga berikutnya.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Nama Anda
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Arnold B. / Anonim"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Kota / Domisili
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bajawa, Kupang, Denpasar, Jakarta"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Pesan Semangat
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tuliskan kata penyemangat untuk Laskar Jaramasi..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                KIRIM DUKUNGAN
              </button>

              {submitted && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs rounded-lg text-center font-medium animate-in fade-in">
                  Pesan semangat Anda berhasil ditampilkan di dinding suporter!
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Live Feed of Messages */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800">
              <span className="font-bold uppercase tracking-wider text-zinc-300">
                Pesan Dari Pecinta Sepak Bola NTT
              </span>
              <span className="font-mono-nums">{messages.length} Pesan</span>
            </div>

            <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-2 scrollbar-none">
              {messages.length === 0 ? (
                <div className="text-center py-12 px-4 bg-zinc-900/40 rounded-xl border border-zinc-800/80">
                  <MessageSquare className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                  <p className="text-xs text-zinc-300 font-semibold mb-1">
                    Belum Ada Pesan Dukungan
                  </p>
                  <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                    Kirimkan doa dan semangat pertama Anda melalui formulir di samping untuk membakar semangat para pemain!
                  </p>
                </div>
              ) : (
                messages.map((item) => (
                  <div
                    key={item.id}
                    className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 transition-colors hover:border-zinc-700"
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{item.name}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-zinc-400 flex items-center gap-1 text-[11px]">
                          <MapPin className="w-3 h-3 text-red-500" />
                          {item.location}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-500">{item.timestamp}</span>
                    </div>

                    <p className="text-xs text-zinc-200 leading-relaxed font-normal">
                      "{item.message}"
                    </p>

                    <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                      <button
                        onClick={() => onLikeMessage(item.id)}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{item.likes} Suporter Setuju</span>
                      </button>
                      <span className="text-[10px] text-zinc-600 uppercase font-mono">PSN BISA!</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
