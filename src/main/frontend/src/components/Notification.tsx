import notification from "../assets/notification.svg";

interface NotificationProps {
  text: string;
  onClick: () => void;
}

const Notification: React.FC<NotificationProps> = ({ text, onClick }) => {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <div>
      <button className="w-[22px]" onClick={handleButtonClick}>
        <img src={notification} alt="알림 아이콘" />
      </button>
    </div>
  );
};

export default Notification;
