import exit from "../assets/exit.svg";

interface ExitButtonProps {
  text: string;
  onClick: () => void;
}

const ExitButton: React.FC<ExitButtonProps> = ({ text, onClick }) => {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        <img src={exit} alt="Exit Icon" />
      </button>
    </div>
  );
};

export default ExitButton;
