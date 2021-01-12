import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Search from '../components/Search'
import Categories from '../components/Categories'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'
import Footer from "../components/Footer"
import "../assets/styles/App.scss"
const App = () => {
    const [ videos, setVideos ] = useState({mylist: [], trends: [], originals: [] })
    useEffect(() => {
        fetch('http://localhost:3000/initalState')
            .then(response => response.json())
            .then(data => setVideos(data))
    }, [])
    console.log(videos)
    return (
        <div className="App">
            <Header/>
            <Search></Search>
            {videos.mylist.length > 0 && (
                <Categories title="My list">
                    <Carousel>
                        <CarouselItem></CarouselItem>
                        <CarouselItem></CarouselItem>
                        <CarouselItem></CarouselItem>
                    </Carousel>
                </Categories>
            )}

            <Categories title="On trend">
                <Carousel>
                    {videos.trends.map(item =>
                        <CarouselItem key={item.id} {...item}></CarouselItem>
                    )}
                    <CarouselItem></CarouselItem>
                </Carousel>
            </Categories>

            <Categories title="Originals">
                <Carousel>
                    {videos.originals.map(origin =>
                        <CarouselItem key={origin.id} {...origin}></CarouselItem>
                    )}
                </Carousel>
            </Categories>
            <Footer></Footer>
        </div>
)}

export default App