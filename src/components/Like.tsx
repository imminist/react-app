import { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import React from 'react'

interface Props {
  onClick: () => void
}
const Like = ({ onClick }: Props) => {
  const [click, setClick] = useState(true)
  function toggle() {
    setClick(!click)
    onClick()
    return click
  }
  if (click) return <AiFillHeart color="#ff6b81" size={40} onClick={toggle} />
  return <AiOutlineHeart color="#ff6b81" size={40} onClick={toggle} />
}

export default Like

