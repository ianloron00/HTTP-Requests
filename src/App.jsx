import './App.css'
import { useState } from "react"
import { useFetch } from './hooks/useFetch'

const url = "http://localhost:3000/products"

function App() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const { data: items, httpConfig, loading, error } = useFetch(url)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price
    }

    httpConfig(product, "POST")
    setName("")
    setPrice("")
  }

  return (
    <>
      <h1>Lista de Produtos</h1>
      {/* loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!loading && <ul>
        {items && items.map((product) => (
            <li key={product.id}>
              {product.name} - R$: {product.price}
            </li>
        ))}
      </ul>}
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
          { loading &&
          <input
            type="submit"
            disabled
            value="Aguarde"
          /> }
          { !loading &&
          <input
            type="submit"
            value="Criar"
          /> }
        </form>
      </div>
    </>
  )
}

export default App
