import Left from "../assets/Left.svg";

interface NextButtonProps {
  text: string;
  onClick: () => void;
}

const BeforeButton: React.FC<NextButtonProps> = ({ text, onClick }) => {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        <img src={Left} alt="Before Icon" />
      </button>
    </div>
  );
};

export default BeforeButton;
