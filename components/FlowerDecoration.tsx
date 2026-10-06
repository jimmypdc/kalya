/**
 * Subtle flower SVG decoration for use in backgrounds and borders.
 * Designed to be unobtrusive and accessible (aria-hidden).
 */
export default function FlowerDecoration({
  className = '',
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="6" rx="3" ry="4" opacity="0.3" />
      <ellipse cx="18" cy="12" rx="4" ry="3" opacity="0.3" />
      <ellipse cx="12" cy="18" rx="3" ry="4" opacity="0.3" />
      <ellipse cx="6" cy="12" rx="4" ry="3" opacity="0.3" />
      <ellipse
        cx="15"
        cy="9"
        rx="2.5"
        ry="3"
        opacity="0.2"
        transform="rotate(45 15 9)"
      />
      <ellipse
        cx="15"
        cy="15"
        rx="2.5"
        ry="3"
        opacity="0.2"
        transform="rotate(-45 15 15)"
      />
      <ellipse
        cx="9"
        cy="15"
        rx="2.5"
        ry="3"
        opacity="0.2"
        transform="rotate(45 9 15)"
      />
      <ellipse
        cx="9"
        cy="9"
        rx="2.5"
        ry="3"
        opacity="0.2"
        transform="rotate(-45 9 9)"
      />
    </svg>
  );
}
