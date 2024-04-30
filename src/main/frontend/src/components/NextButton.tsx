import Right from "../assets/Right.svg";

interface NextButtonProps {
  text: string;
  onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ text, onClick }) => {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        <img src={Right} alt="Next Icon" />
      </button>
    </div>
  );
};

export default NextButton;
