import React, { useEffect, useState } from 'react'
interface Props {
  category: string
}

const ProductList = ({ category }: Props) => {
  const [products, setProducts] = useState<string[]>([])
  useEffect(() => {
    console.log('Fetching products in', category)
    setProducts(['Clothing', 'Household'])
  }, [category])

  return <div>ProductList</div>
}

export default ProductList
