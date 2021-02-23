import React from 'react'
import {connect} from 'react-redux'
import {setFavorites, deleteFavorite} from '../actions'
import "../assets/styles/components/CarouselItem.scss"
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import play from '../assets/icons/play.svg'
import plus from '../assets/icons/plus.svg'
import remove from '../assets/icons/remove.svg'
const CarouselItem = (props) => {
    const {id, cover, title, year, contentRating, duration, isList} = props
    const handleSetFavorite = () => {
        props.setFavorites({id, cover, title, year, contentRating, duration})
    }
    const handleDeleteFavorite = (itemId) => {
        props.deleteFavorite(itemId)
    }
    return (
        <div className="carousel-item">
        <img className="carousel-item__img" src={cover} alt={title}/>
        <div className="carousel-item__details">
            <div>
                <Link to={`/player/${id}`}>
                    <img className="carousel-item__details--img" src={play} alt="Play Icon"/> 
                </Link>
                {isList ?
                    <img className="carousel-item__details--img" src={remove} alt="Remove Icon" onClick={()=> handleDeleteFavorite(id)}/>
                    : 
                    <img className="carousel-item__details--img" src={plus} alt="Plus Icon" onClick={handleSetFavorite}/>
                }
            </div>
            <p className="carousel-item__details--title">{title}</p>
            <p className="carousel-item__details--subtitle">{year} {contentRating} {duration} minutes</p>
        </div>
        </div>
    )
}
CarouselItem.propTypes = {
    cover: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    contentRating: PropTypes.string,
    duration: PropTypes.number,
}

const mapDispatchToProps = {
    setFavorites,
    deleteFavorite,
}
export default connect(null, mapDispatchToProps)(CarouselItem)