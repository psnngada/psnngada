import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ChevronRight, X, Newspaper, User } from 'lucide-react';
import { NewsArticle } from '../data/clubData';

interface NewsSectionProps {
  news: NewsArticle[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = ['Semua', 'Tim', 'Pertandingan', 'Liga 3', 'Transfer', 'Latihan', 'Klub'];

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [news, selectedCategory, searchQuery]);

  return (
    <section id="berita" className="py-20 bg-zinc-900/60 border-t border-zinc-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-red-500 mb-2">
            KABAR TERKINI
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase">
            BERITA TERBARU
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-4 rounded-full" />
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-800/80">
          {/* Functional Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari berita klub..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-16 bg-zinc-950/60 rounded-2xl border border-zinc-800">
            <Newspaper className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 font-medium text-sm">Tidak ada berita yang sesuai dengan pencarian Anda.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
              }}
              className="mt-4 text-xs text-red-500 font-bold hover:underline cursor-pointer"
            >
              Reset Filter Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredNews.map((article) => (
              <article
                key={article.id}
                className="bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col group shadow-lg"
              >
                {/* News Image */}
                <div className="relative h-48 overflow-hidden bg-zinc-900">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                </div>

                {/* News Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {/* Clean unboxed metadata with separators according to constitution */}
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3 font-medium">
                    <span className="text-red-400 font-semibold">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-white leading-snug line-clamp-2 group-hover:text-red-500 transition-colors mb-2">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4 flex-1">
                    {article.summary}
                  </p>

                  {/* Read More Button */}
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="mt-auto pt-3 border-t border-zinc-800/80 inline-flex items-center justify-between text-xs font-bold text-red-500 hover:text-red-400 transition-colors cursor-pointer group/btn"
                  >
                    <span>Baca Selengkapnya</span>
                    <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Article Detail Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Modal Header Image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-zinc-900">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <button
                onClick={() => setActiveArticle(null)}
                aria-label="Tutup Berita"
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-medium">
                <span className="text-red-400 font-bold">{activeArticle.category}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeArticle.date}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {activeArticle.author}
                </span>
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                {activeArticle.title}
              </h2>

              <p className="text-sm text-zinc-300 font-semibold border-l-2 border-red-600 pl-3 leading-relaxed">
                {activeArticle.summary}
              </p>

              <div className="text-sm text-zinc-300 space-y-4 pt-3 leading-relaxed border-t border-zinc-800">
                <p>{activeArticle.content}</p>
                <p>
                  Dukungan tak kenal lelah dari masyarakat Bajawa, Kabupaten Ngada, serta seluruh
                  pecinta sepak bola NTT menjadi pelecut semangat utama dalam mengarungi ketatnya
                  persaingan Liga 3 Nasional musim ini.
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-800 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Tutup Berita
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
