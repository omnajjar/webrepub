import LogoSVG from '~/svg/logo.svg';

interface LogoProps {
  scale: number;
  onClick?: () => void;
}
export function Logo({ scale, onClick }: LogoProps) {
  const base = 32;

  const logoScale = {
    height: `${base * scale}px`,
    width: `${base * (scale + 1)}px`,
  };

  return (
    <LogoSVG
      onClick={onClick}
      style={{ ...logoScale }}
      className={`logo-shadow ${onClick ? 'pointer-cursor' : ''}`}
    ></LogoSVG>
  );
}
