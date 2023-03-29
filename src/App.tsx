import { Children, useState, useEffect } from 'react'
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
    const originalUsers = [...users]
    setUsers(users.filter((u) => u.id !== user.id))

    axios
      .delete('https://jsonplaceholder.typicode.com/users' + user.id)
      .catch((err) => {
        setError(err.message)
        setUsers(originalUsers)
      })
  }
  const addUser = () => {
    const originalUsers = [...users]
    const newUser = { id: 0, name: 'Hiro' }
    setUsers([newUser, ...users])
    axios
      .post('https://jsonplaceholder.typicode.com/xusers', newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message)
        setUsers(originalUsers)
      })
  }

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add User
      </button>
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
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
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
    </>
  )
}

export default App
