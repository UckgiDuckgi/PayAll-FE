type TriangleProps = {
  color?: string;
  className?: string;
};

export const Triangle = ({
  color = '#6A8DFF',
  className = '',
}: TriangleProps) => {
  return (
    <svg
      width='10'
      height='6'
      viewBox='0 0 10 6'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.28123 0H8.71873C9.38748 0 9.72185 0.809375 9.24998 1.28125L5.53123 5C5.23748 5.29375 4.76248 5.29375 4.47185 5L0.749977 1.28125C0.278102 0.809375 0.612477 0 1.28123 0Z'
        fill={color}
      />
    </svg>
  );
};
