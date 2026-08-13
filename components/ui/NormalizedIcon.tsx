import Image from 'next/image';

interface NormalizedIconProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  scale?: number;
  className?: string;
}

export function NormalizedIcon({
  src,
  alt,
  width,
  height,
  scale = 1.5,
  className = ''
}: NormalizedIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{
        transform: `scale(${scale})`,
        filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.15)) drop-shadow(0 2px 4px rgba(0,0,0,0.2)) drop-shadow(0 0 8px rgba(200,162,72,0.15))'
      }}
    />
  );
}
