import React from 'react'
import "../assets/styles/components/Search.scss"
const Search = () => (
    <section className="main">
        <h2 className="main__title">What do you want to see?</h2>
        <input type="text" className="input" placeholder="Buscar..."></input>
    </section>
)

export default Search