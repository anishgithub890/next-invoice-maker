'use client';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4 
        py-3 
      hover:bg-zinc-100
      dark:hover:bg-zinc-800
        font-semibold
      text-zinc-900
      dark:text-white
      dark:bg-zinc-900
        transition
      "
    >
      {label}
    </div>
  );
};

export default MenuItem;
