import React from 'react';
import { UserCheck, Award, ShieldCheck } from 'lucide-react';
import { OfficialStaff } from '../data/clubData';

interface StaffSectionProps {
  staff: OfficialStaff[];
}

export const StaffSection: React.FC<StaffSectionProps> = ({ staff }) => {
  return (
    <section className="py-16 bg-zinc-900/40 border-t border-zinc-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-red-500 mb-2">
            JAJARAN KEPELATIHAN
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight uppercase">
            OFFICIAL TEAM
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-4 rounded-full" />
        </div>

        {/* Staff Grid or Empty State */}
        {staff.length === 0 ? (
          <div className="text-center py-12 px-4 bg-zinc-950/60 rounded-2xl border border-zinc-800/80 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-3">
              <UserCheck className="w-7 h-7 text-zinc-500" />
            </div>
            <h3 className="font-display font-bold text-base text-white mb-1.5">
              Jajaran Official & Pelatih Belum Diinput
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
              Data pelatih kepala, asisten, manajer, dan tim medis dapat diinput melalui Panel Kelola Data.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {staff.map((member) => (
              <div
                key={member.id}
                className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-5 flex flex-col items-center text-center hover:border-zinc-700 transition-all group"
              >
                {/* Avatar Icon */}
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center mb-4 group-hover:border-red-600 transition-colors">
                  <UserCheck className="w-8 h-8 text-zinc-400 group-hover:text-red-500 transition-colors" />
                </div>

                {/* Role */}
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-500 mb-1">
                  {member.role}
                </span>

                {/* Name */}
                <h4 className="font-display font-bold text-sm text-white mb-2 line-clamp-2">
                  {member.name}
                </h4>

                {/* License or experience */}
                <p className="text-[11px] text-zinc-400 leading-normal line-clamp-3">
                  {member.experience}
                </p>

                {member.license && (
                  <div className="mt-3 pt-2 border-t border-zinc-900 w-full text-[10px] text-zinc-500 font-semibold uppercase">
                    {member.license}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
