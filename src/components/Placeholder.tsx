import { ReactNode } from "react";

type ImageProps = {
  variant?: "image";
  label?: string;
  className?: string;
  icon?: ReactNode;
  ratio?: string;
  src?: string;
  alt?: string;
};

type AvatarProps = {
  variant: "avatar";
  label: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  src?: string;
};

type LogoProps = {
  variant: "logo";
  label: string;
  className?: string;
  src?: string;
};

type Props = ImageProps | AvatarProps | LogoProps;

const PHOTO_ICON = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="9" cy="11" r="2" />
    <path d="M3 17l5-4 4 3 4-5 5 6" strokeLinejoin="round" />
  </svg>
);

function ImagePlaceholder({ label, className = "", icon, ratio = "aspect-[16/9]", src, alt }: ImageProps) {
  return (
    <div
      className={`relative ${ratio} overflow-hidden rounded-xl border border-border bg-gradient-to-br from-brand-soft via-white to-sky-100 ${className}`}
      role="img"
      aria-label={alt ?? label ?? "Image"}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? label ?? ""}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(29,78,216,0.18) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-brand/50">
            <div className="rounded-full bg-white/70 ring-1 ring-brand/15 p-3 mb-2 backdrop-blur-sm">
              {icon ?? PHOTO_ICON}
            </div>
            {label && (
              <span className="text-[11px] font-semibold uppercase tracking-widest text-brand/60 px-3 text-center">
                {label}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function initials(name: string): string {
  const parts = name
    .replace(/[^A-Za-z .'-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "·";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_SIZES = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-base",
} as const;

function AvatarPlaceholder({ label, className = "", size = "md", src }: AvatarProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={label}
        loading="lazy"
        className={`inline-block rounded-full object-cover bg-brand-soft ring-2 ring-white shadow-sm ${AVATAR_SIZES[size]} ${className}`}
      />
    );
  }
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-brand to-sky-500 text-white font-semibold ring-2 ring-white shadow-sm ${AVATAR_SIZES[size]} ${className}`}
      role="img"
      aria-label={label}
    >
      {initials(label)}
    </div>
  );
}

function LogoPlaceholder({ label, className = "", src }: LogoProps) {
  return (
    <div
      className={`relative h-20 rounded-lg border border-border bg-white overflow-hidden flex items-center justify-center px-3 ${className}`}
      role="img"
      aria-label={label}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="max-h-full max-w-full object-contain p-2"
        />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(15,23,42,0.04) 25%, transparent 25%, transparent 50%, rgba(15,23,42,0.04) 50%, rgba(15,23,42,0.04) 75%, transparent 75%, transparent)",
              backgroundSize: "8px 8px",
            }}
            aria-hidden
          />
          <div className="relative flex items-center gap-2">
            <span
              className="inline-block h-5 w-5 rounded-sm bg-gradient-to-br from-brand to-sky-500"
              aria-hidden
            />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 text-center leading-tight">
              {label}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default function Placeholder(props: Props) {
  if (props.variant === "avatar") return <AvatarPlaceholder {...props} />;
  if (props.variant === "logo") return <LogoPlaceholder {...props} />;
  return <ImagePlaceholder {...props} />;
}
