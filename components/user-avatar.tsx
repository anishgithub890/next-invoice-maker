import { cn } from '@/lib/utils';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  src?: string | null | undefined;
  className?: string;
}

export const UserAvatar = ({ src, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn('h-7 w-7', className)}>
      <AvatarImage src={src || '/images/useravatar.png'} />
    </Avatar>
  );
};
