import React, { useState } from 'react';
import { MapPin, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { ClubInfo } from '../data/clubData';

interface ContactSectionProps {
  clubInfo: ClubInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ clubInfo }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="kontak" className="py-20 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-red-500 mb-2">
            HUBUNGI KAMI
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase">
            SEKRETARIAT & KONTAK
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-4 rounded-full" />
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl">
            Untuk keperluan media, sponsorship, uji coba, maupun pertanyaan suporter resmi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="font-display font-bold text-xl text-white">
              Kantor Sekretariat PSN Ngada
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-zinc-300 text-sm mb-1">Alamat Resmi:</span>
                  <p className="text-zinc-400 leading-relaxed">{clubInfo.contact.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-zinc-300 text-sm mb-1">Email Korespondensi:</span>
                  <p className="text-zinc-400 font-mono">{clubInfo.contact.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-zinc-300 text-sm mb-1">Telepon / WhatsApp:</span>
                  <p className="text-zinc-400 font-mono">{clubInfo.contact.phone}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <h4 className="font-semibold text-xs text-zinc-300 uppercase mb-2">Jam Kerja Kantor:</h4>
              <p className="text-xs text-zinc-400 leading-normal">
                Senin – Jumat: 08:30 – 16:30 WITA<br />
                Sabtu (Hari Latihan): 08:30 – 13:00 WITA<br />
                Minggu: Libur (Kecuali Hari Pertandingan Resmi)
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
            <h3 className="font-display font-bold text-xl text-white mb-2">
              Kirim Pesan Resmi ke Manajemen
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Silakan isi formulir di bawah ini. Tim manajemen PSN Ngada akan merespons secepatnya.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Perihal / Subjek</label>
                <input
                  type="text"
                  required
                  placeholder="Kemitraan, Media, Suporter, atau Umum"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Pesan Lengkap</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan pesan lengkap Anda di sini..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                KIRIM PESAN
              </button>

              {sent && (
                <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-400 rounded-lg font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pesan Anda telah diterima. Terima kasih atas perhatian kepada PSN Ngada!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
