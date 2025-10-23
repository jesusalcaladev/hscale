type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...props }: Props) => {
  return (
    <button
      className="bg-white/5 border border-neutral-500 rounded-xl px-3 py-2 hover:cursor-pointer hover:scale-110 transition-all"
      {...props}
    >
      {children}
    </button>
  );
};
