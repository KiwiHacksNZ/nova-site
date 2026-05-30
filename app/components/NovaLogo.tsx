/*
 * Nova wordmark. Renders the real logo export at public/nova-logo.png
 * (blue/purple/pink layered lettering with a yellow star for the "o").
 * Scale via the `className` height utility, e.g. "h-28 sm:h-40".
 */

type NovaLogoProps = {
  className?: string;
};

export default function NovaLogo({ className = "h-24" }: NovaLogoProps) {
  return (
    // Static brand asset; plain img is fine and avoids next/image loader config.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/nova-logo.png"
      alt="Nova by KiwiHacks"
      className={`${className} w-auto select-none`}
    />
  );
}
