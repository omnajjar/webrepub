import { generateFromString } from 'generate-avatar';
import Image from 'next/image';

interface IDAvatarProps {
  id: string;
  className?: string;
  width?: number;
  height?: number;
}

export function IDAvatar({ id, width, height, className }: IDAvatarProps) {
  return (
    <Image
      className={className ?? 'h-8 w-8 rounded-full'}
      src={`data:image/svg+xml;utf8,${generateFromString(id)}`}
      alt='avatar'
      width={width ?? 180}
      height={height ?? 180}
    />
  );
}
