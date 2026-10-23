"use client";

import Image from "next/image";
import { useDictionary } from "@/providers/LanguageProvider";
import { Marquee } from "./Marquee";

export function Testimonials() {
  const { testimonials } = useDictionary().landing;
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="bg-surface-muted px-6 py-20 dark:bg-surface">
      <h2 id="testimonials-title" className="mx-auto mb-8 max-w-6xl text-center text-2xl font-bold text-content">{testimonials.title}</h2>
      <Marquee label={testimonials.title} seconds={25} items={testimonials.users.map((user, index) => (
        <figure key={user.name} className="h-full w-[280px] rounded-lg bg-surface-raised p-6 text-content shadow-md md:w-[340px]">
          <figcaption className="mb-4 flex items-center gap-4">
            <Image src={"/testimonials/user" + (index + 1) + ".png"} alt="" width={56} height={56}
              className="size-14 shrink-0 rounded-full object-cover" />
            <div><p className="font-bold">{user.name}</p><p className="text-xs">{user.location}</p></div>
          </figcaption>
          <blockquote className="text-sm italic">{user.quote}</blockquote>
        </figure>
      ))} />
    </section>
  );
}
