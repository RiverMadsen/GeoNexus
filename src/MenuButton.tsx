import { MdOutlineMenu } from "react-icons/md";

export const MenuButton = ({ onClick }: { onClick: () => void }) => {

  const handleClick = () => {
    onClick();
  };

  return (
    <button className='text-4xl ' style={{color:'var(--nex-red)', position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}  onClick={handleClick}>
      <MdOutlineMenu />
    </button>
  );
};