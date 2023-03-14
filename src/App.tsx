import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ListGroup from './components/ListGroup'

function App() {
  let items = ['Hanoi', 'Saigon', 'Thanh Hoa', 'Da nang']

  return <ListGroup items={items} heading="Cities" />
}

export default App
