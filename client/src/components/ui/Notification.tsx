import { type FC, useEffect, useState } from 'react';
import type { NotificationProps } from '@types';
import { notificationClasses, svgColorClasses } from '@constants';

export const Notification: FC<NotificationProps> = ({ type, message, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing && onClose) {
      onClose();
    }
  };

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={`fixed right-4 bottom-4 z-50 flex items-center space-x-2 rounded p-4 shadow-lg ${isClosing ? 'animate-slide-out' : 'animate-slide-in'} ${notificationClasses[type]}`}
    >
      <div className="font-markRegular">{message}</div>
      {onClose && (
        <button onClick={handleClose} className="ml-4">
          <svg
            width={20}
            height={20}
            className="cross__svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className={`cross__circle ${svgColorClasses[type]}`}
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className={`cross__path cross__path--right ${svgColorClasses[type]}`}
              fill="none"
              d="M16,16 l20,20"
            />
            <path
              className={`cross__path cross__path--right ${svgColorClasses[type]}`}
              fill="none"
              d="M16,36 l20,-20"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
