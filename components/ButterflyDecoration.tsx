/**
 * Subtle butterfly SVG decoration for use in backgrounds and borders.
 * Designed to be unobtrusive and accessible (aria-hidden).
 */
export default function ButterflyDecoration({
  className = '',
  size = 24,
  style,
}: {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
      fill="currentColor"
    >
      <path
        d="M12 2c-.5 0-.9.2-1.2.5L9.5 4.2C8.8 3.5 7.8 3 6.5 3 4.6 3 3 4.6 3 6.5c0 1.5.9 2.8 2.2 3.3-.1.3-.2.6-.2 1 0 1.1.9 2 2 2h1.2l2.3 6.7c.2.5.6.8 1.2.8h.6c.6 0 1-.3 1.2-.8L16 12.8H17c1.1 0 2-.9 2-2 0-.4-.1-.7-.2-1C20.1 9.3 21 8 21 6.5 21 4.6 19.4 3 17.5 3c-1.3 0-2.3.5-3 1.2l-1.3-1.7c-.3-.3-.7-.5-1.2-.5zM7 6.5c0-.8.7-1.5 1.5-1.5S10 5.7 10 6.5 9.3 8 8.5 8 7 7.3 7 6.5zm8.5-1.5c.8 0 1.5.7 1.5 1.5S16.3 8 15.5 8 14 7.3 14 6.5s.7-1.5 1.5-1.5z"
        opacity="0.3"
      />
      <circle cx="12" cy="10" r="1.5" />
    </svg>
  );
}
