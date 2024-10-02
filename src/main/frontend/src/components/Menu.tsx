import Menu from "../assets/menu.svg";

interface MenuButtonProps {
  text: string;
  onClick: () => void;
}

const SearchButton: React.FC<MenuButtonProps> = ({ text, onClick }) => {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        <img src={Menu} alt="메뉴" />
      </button>
    </div>
  );
};

export default SearchButton;
