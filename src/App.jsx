import './App.css'
import { useState, useEffect } from "react"
const url = "http://localhost:3000/products"

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  // resgatando dados
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url)
      const data = await res.json()
      setProducts(data)
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })

    console.log(res)
  }

  return (
    <>
      <h1>Lista de Items</h1>
      <ul>
        {products.map((product) => (
            <li key={product.id}>
              {product.name} - R$: {product.price}
            </li>
        ))}
      </ul>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) =>setName(e.target.value)}
            />
          </label>
          <label>Preço:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) =>setPrice(e.target.value)}
            />
          </label>
          <input
            type="submit"
            value="Criar"
          />
        </form>
      </div>
    </>
  )
}

export default App
