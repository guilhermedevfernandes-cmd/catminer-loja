import Image from "next/image";

type BrandLogoProps = {
  /** Altura exibida da logo (px). */
  size?: number;
  className?: string;
  priority?: boolean;
};

const LOGO_ASPECT = 1366 / 662;

export function BrandLogo({ size = 44, className, priority = false }: BrandLogoProps) {
  const height = size;
  const width = Math.round(height * LOGO_ASPECT);

  return (
    <Image
      src="/brand/logo.png"
      alt="Cat Miner"
      width={width}
      height={height}
      priority={priority}
      className={`h-auto w-auto object-contain ${className ?? ""}`}
      style={{ height, width: "auto", maxWidth: width }}
    />
  );
}
