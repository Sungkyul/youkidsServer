import Search from "../assets/search.svg";

interface SearchButtonProps {
  text: string;
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ text, onClick }) => {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <div>
      <button className="mr-2 w-[22px]" onClick={handleButtonClick}>
        <img src={Search} alt="돋보기" />
      </button>
    </div>
  );
};

export default SearchButton;
