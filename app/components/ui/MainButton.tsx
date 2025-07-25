interface IProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
className?: string
children?: React.ReactNode
}

export default function MainButton({className,children,...rest}:IProp) {
  return (
    <button className={` rounded-full shadow-md shadow-black duration-500 ring-1 px-2 py-1  ring-green-900/30 hover:shadow-2xl hover:translate-y-1  ${className}`} {...rest}>
      {children}
    </button>
  )
}
