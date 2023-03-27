import { Children, useState, useEffect, useRef } from 'react'
import Form from './components/Form'
import ProductList from './components/ProductList'
import Expense from './expense-tracer/components/Expense'
import ExpenseFilter from './expense-tracer/components/ExpenseFilter'
import ExpenseList from './expense-tracer/ExpenseList'
import axios, { CanceledError } from 'axios'
import ExpenseForm from './expense-tracer/components/ExpenseForm'
import categories from './expense-tracer/categories'

interface User {
  id: number
  name: string
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  const [category, setCategory] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    axios
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        setUsers(res.data)
        setLoading(false)
      })
      .catch((err) => {
        if (err instanceof CanceledError) return
        setError(err.message)
        setLoading(false)
      })
    return () => controller.abort()
  }, [])

  // afterRender
  useEffect(() => {
    if (ref.current) ref.current.focus()
  })
  // Side effect

  useEffect(() => {
    document.title = 'My App Hello'
  })

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: 'aaa',
      amount: 10,
      category: 'Utilities',
    },
    {
      id: 2,
      description: 'bbb',
      amount: 20,
      category: 'Utilities',
    },
    {
      id: 3,
      description: 'ccc',
      amount: 30,
      category: 'Utilities',
    },
    {
      id: 4,
      description: 'ddd',
      amount: 40.35543,
      category: 'Entertainment',
    },
  ])
  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses

  const deleteUser = (user: User) => {
    setUsers(users.filter((u) => u.id !== user.id))
    const originalUsers = [...users]

    axios
      .delete('https://jsonplaceholder.typicode.com/users' + user.id)
      .catch((err) => {
        setError(err.message)
        setUsers(originalUsers)
      })
  }

  return (
    <div>
      <p className="text-danger">{error}</p>
      {isLoading && <div className="spinner-border"></div>}
      <div className="mb-3">
        <ul className="list-group">
          {users.map((user) => (
            <li
              key={user.id}
              className="list-group-item d-flex justify-content-between"
            >
              {user.name}
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-5">
        <ExpenseForm />
      </div>
      <div className="mb-3">
        <select
          name=""
          id=""
          className="form-select"
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value=""></option>
          <option value="Clothing">Clothing</option>
          <option value="Household">Household</option>
        </select>
        <ProductList category={category} />
      </div>

      <div className="mb-3">
        <input ref={ref} type="text" className="form-control" />
      </div>

      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </div>
  )
}

export default App
