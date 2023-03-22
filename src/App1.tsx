import { Children, useState } from 'react'
import Form from './components/Form'
import Expense from './expense-tracer/components/Expense'
import ExpenseFilter from './expense-tracer/components/ExpenseFilter'
import ExpenseList from './expense-tracer/ExpenseList'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('')

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

  return (
    <div>
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
