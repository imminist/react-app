import { useRef, useEffect } from 'react'

const App = () => {
  const ref = useRef<HTMLInputElement>(null)

  // afterRender
  useEffect(() => {
    if (ref.current) ref.current.focus()
  })
  // Side effect

  return (
    <div>
      <input ref={ref} type="text" className="form-control" />
    </div>
  )
}

export default App
