// Passing Children

interface Props {
  children: ReactNode
}

const Component = ({ children }: Props) => {
  return <div>{children}</div>
}