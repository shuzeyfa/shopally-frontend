"use client";

import Image from "next/image";
import { useDictionary } from "@/providers/LanguageProvider";

export function Testimonials() {
  const dict = useDictionary();
  const users = dict.landing.testimonials.users;
  const marqueeUsers = [...users, ...users];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-surface overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
            {dict.landing.testimonials.title}
          </h2>
        </div>

        {/* Continuous Right-to-Left Testimonials Marquee */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Subtle edge fade gradient */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-surface to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-surface to-transparent z-10" />

          <div className="animate-marquee-fast gap-6 flex">
            {marqueeUsers.map((user, idx) => (
              <div
                key={idx}
                className="min-w-[280px] sm:min-w-[340px] max-w-[360px] flex-shrink-0 flex flex-col p-6 rounded-xl bg-surface-muted/70 border border-line shadow-md text-left transition-transform duration-300 hover:scale-[1.02] hover:border-accent select-none"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <Image
                    src={`/testimonials/user${(idx % users.length) + 1}.png`}
                    alt={user.name}
                    width={56}
                    height={56}
                    className="h-12 w-12 rounded-full object-cover border-2 border-accent/40 shadow-sm flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-content text-sm sm:text-base">{user.name}</h4>
                    <span className="text-xs text-accent font-semibold">{user.location}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-content-muted leading-relaxed italic">
                  &ldquo;{user.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
