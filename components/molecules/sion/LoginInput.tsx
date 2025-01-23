export const LoginInput = ({
  title,
  type = 'text',
  placeholder = '',
  onChange,
  value,
}: {
  title: string;
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value?: string;
}) => {
  return (
    <div className='flex flex-col items-center justify-stretch w-full h-15 border-b border-white pb-1'>
      <div className='text-lg font-bold text-left w-full text-darkGrey mb-3'>
        {title}
      </div>
      <input
        onChange={(e) => onChange(e.target.value)}
        className='w-full h-5 rounded-md p-2 bg-transparent outline-none font-normal'
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};
