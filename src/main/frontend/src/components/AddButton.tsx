import Plus from "../assets/Plus.svg";

interface AddButtonProps {
  text: string;
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ text, onClick }) => {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        <img src={Plus} alt="Plus Icon" />
      </button>
    </div>
  );
};

export default AddButton;
