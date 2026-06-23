import { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fetchpriority?: 'high' | 'low' | 'auto';
  style?: React.CSSProperties;
}

export function LazyImage({
  src,
  alt,
  className = '',
  width,
  height,
  fetchpriority = 'auto',
  style,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 skeleton-light" aria-hidden="true" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={fetchpriority === 'high' ? 'eager' : 'lazy'}
        decoding={fetchpriority === 'high' ? 'sync' : 'async'}
        fetchPriority={fetchpriority}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        style={style}
      />
    </>
  );
}
