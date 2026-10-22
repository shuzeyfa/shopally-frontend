"use client";

import Image from "next/image";
import { useDictionary } from "@/providers/LanguageProvider";

export function Testimonials() {
  const dict = useDictionary();
  const users = dict.landing.testimonials.users;

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-surface">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
            {dict.landing.testimonials.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {users.slice(0, 3).map((user, idx) => (
            <div
              key={idx}
              className="flex flex-col p-4 text-left transition-transform duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <Image
                  src={`/testimonials/user${idx + 1}.png`}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover border-2 border-accent/40 shadow-sm"
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
    </section>
  );
}
