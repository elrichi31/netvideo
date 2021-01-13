import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Search from '../components/Search'
import Categories from '../components/Categories'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'
import Footer from "../components/Footer"
import useInitialState from "../hooks/useInitialState.js"
import "../assets/styles/App.scss"

const API = 'http://localhost:3000/initalState/'
const App = () => {
    const initialState = useInitialState(API)
    return (
        <div className="App">
            <Header/>
            <Search></Search>
            {initialState.mylist.length > 0 && (
                <Categories title="My list">
                    <Carousel>
                        {initialState.mylist.map(list =>
                            <CarouselItem key={list.id} {...list}></CarouselItem>
                        )}
                    </Carousel>
                </Categories>
            )}

            <Categories title="On trend">
                <Carousel>
                    {initialState.trends.map(item =>
                        <CarouselItem key={item.id} {...item}></CarouselItem>
                    )}
                    <CarouselItem></CarouselItem>
                </Carousel>
            </Categories>

            <Categories title="Originals">
                <Carousel>
                    {initialState.originals.map(origin =>
                        <CarouselItem key={origin.id} {...origin}></CarouselItem>
                    )}
                </Carousel>
            </Categories>
            <Footer></Footer>
        </div>
)}

export default App