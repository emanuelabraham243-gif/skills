"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryImage } from "@/lib/types";

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-paper-dim sm:aspect-[16/10]"
      >
        <Image
          src={current.url}
          alt={current.alt}
          fill
          unoptimized
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
          {active + 1} / {images.length}
        </span>
      </button>

      <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActive(i)}
            className={`relative aspect-square overflow-hidden rounded-lg ring-2 transition-all ${
              i === active ? "ring-accent" : "ring-transparent opacity-80 hover:opacity-100"
            }`}
          >
            <Image src={img.url} alt={img.alt} fill unoptimized sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setLightbox(false)}
          >
            ✕
          </button>
          <div className="relative h-full max-h-[80vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={current.url} alt={current.alt} fill unoptimized className="object-contain" />
          </div>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                aria-label={`Show image ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-2 w-2 rounded-full ${i === active ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
