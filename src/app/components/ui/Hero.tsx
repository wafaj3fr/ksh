import Image from "next/image";
import React from "react";

type MediaImage = { asset?: { url?: string } ; alt?: string };
type MediaFile  = { asset?: { url?: string } };

interface HeroProps {
  /* التوافق مع الكود القديم */
  heroMediaType?: "image" | "video";
  videoSource?: "file" | "url";
  heroImage?: MediaImage;
  heroVideoFile?: MediaFile;
  heroVideoUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;

  /* خصائص جديدة مرنة */
  title?: string;            // بديل heroTitle
  subtitle?: string;         // بديل heroSubtitle
  fullScreen?: boolean;      // هيرو بطول الشاشة
  align?: "center" | "left"; // محاذاة النص
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  overlayOpacity?: number;   // 0..1
}

export default function Hero({
  /* قديم */
  heroMediaType = "image",
  videoSource = "file",
  heroImage,
  heroVideoFile,
  heroVideoUrl,
  heroTitle,
  heroSubtitle,
  /* جديد */
  title,
  subtitle,
  fullScreen = false,
  align = "center",
  ctaLabel,
  ctaHref,
  className = "",
  overlayOpacity = 0.55,
}: HeroProps) {
  const finalTitle = title ?? heroTitle ?? "";
  const finalSubtitle = subtitle ?? heroSubtitle ?? "";

  const isVideo = heroMediaType === "video";
  const hasImage = !!heroImage?.asset?.url;

  // height: full hero في الهوم، و hero متوسط في الصفحات الداخلية
  const heightCls = fullScreen ? "min-h-[70vh] lg:min-h-[86vh]" : "py-16 sm:py-20 lg:py-24";

  // محاذاة النص
  const alignCls =
    align === "left"
      ? "text-left items-start"
      : "text-center items-center";

  return (
    <section
      className={[
        "relative w-full overflow-hidden border-b",
        "border-[color:var(--ksh-gold,#b99a53)]/30 bg-[var(--ksh-bg,#0f1419)]",
        heightCls,
        className,
      ].join(" ")}
    >
      {/* Background Media */}
      <div className="absolute inset-0 -z-10">
        {isVideo ? (
          videoSource === "file" && heroVideoFile?.asset?.url ? (
            <video
              src={heroVideoFile.asset.url}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : videoSource === "url" && heroVideoUrl ? (
            <iframe
              src={heroVideoUrl}
              title="Hero Video"
              className="absolute inset-0 h-full w-full object-cover"
              allow="autoplay; fullscreen; encrypted-media"
            />
          ) : (
            <div className="absolute inset-0 bg-black" />
          )
        ) : hasImage ? (
          <Image
            src={heroImage!.asset!.url!}
            alt={heroImage?.alt || "Hero background"}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--ksh-bg,#0f1419)]" />
        )}
      </div>

      {/* Overlay (gradient + gold wash) */}
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            `linear-gradient(to bottom, rgba(0,0,0,${overlayOpacity}) 0%, rgba(0,0,0,${overlayOpacity}) 40%, rgba(0,0,0,${overlayOpacity * 0.85}) 100%),` +
            `radial-gradient(700px 240px at 0% 0%, rgba(185,154,83,0.08), transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${alignCls}`}>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {finalTitle}
          </h1>

          {finalSubtitle && (
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[color:var(--ksh-gold-soft,#d8c28e)] sm:text-lg">
              {finalSubtitle}
            </p>
          )}

          {(ctaLabel && ctaHref) && (
            <div className={align === "left" ? "mt-8" : "mt-8 flex justify-center"}>
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--ksh-gold,#b99a53)]/40 bg-[color:var(--ksh-gold,#b99a53)]/10 px-5 py-3 text-sm font-medium text-[color:var(--ksh-gold-soft,#d8c28e)] transition hover:bg-[color:var(--ksh-gold,#b99a53)]/15"
              >
                {ctaLabel}
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M12.293 5.293a1 1 0 011.414 0l3.999 4a1 1 0 010 1.414l-4 4a1 1 0 11-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"/>
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
