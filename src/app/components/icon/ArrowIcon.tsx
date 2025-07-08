type ArrowIconProps = {
  color?: string;
};

const ArrowIcon = ({ color }: ArrowIconProps) => {
  return (
    <svg
    className="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="15"
      viewBox="0 0 22 15"
      fill="none"
    >
      <path
        d="M21.7071 8.20711C22.0976 7.81658 22.0976 7.18342 21.7071 6.79289L15.3431 0.428932C14.9526 0.0384078 14.3195 0.0384078 13.9289 0.428932C13.5384 0.819457 13.5384 1.45262 13.9289 1.84315L19.5858 7.5L13.9289 13.1569C13.5384 13.5474 13.5384 14.1805 13.9289 14.5711C14.3195 14.9616 14.9526 14.9616 15.3431 14.5711L21.7071 8.20711ZM0 7.5V8.5H21V7.5V6.5H0V7.5Z"
        fill={color || "white"}
      />
    </svg>
  );
};

export default ArrowIcon;
