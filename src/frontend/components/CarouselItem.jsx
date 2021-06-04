import React from 'react';
import { connect } from 'react-redux';
import '../assets/styles/components/CarouselItem.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteNewFavorite, setNewFavorite } from '../actions';
import play from '../assets/icons/play.svg';
import plus from '../assets/icons/plus.svg';
import remove from '../assets/icons/remove.svg';

function readCookie(name) {

  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');

  for (let i = 0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

const CarouselItem = (props) => {
  const { id, cover, title, year, contentRating, duration, isList, _id } = props;

  const handleSetFavorite = () => {
    const userId1 = readCookie('id');
    const token = readCookie('token');
    props.setNewFavorite({ id, cover, title, year, contentRating, duration, _id, userId1, token });
  };

  const handleDeleteFavorite = (itemId) => {
    console.log(itemId);
    // props.deleteFavorite(itemId);
    props.deleteNewFavorite(itemId);
  };
  return (
    <div className='carousel-item'>
      <img className='carousel-item__img' src={cover} alt={title} />
      <div className='carousel-item__details'>
        <div>
          <Link to={`/player/${id}`}>
            <img className='carousel-item__details--img' src={play} alt='Play Icon' />
          </Link>
          {isList ?
            <img className='carousel-item__details--img' src={remove} alt='Remove Icon' onClick={() => handleDeleteFavorite(_id)} /> :
            <img className='carousel-item__details--img' src={plus} alt='Plus Icon' onClick={handleSetFavorite} />
          }
        </div>
        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>
          {year}
          {' '}
          {contentRating}
          {' '}
          {duration}
          {' '}
          minutes
        </p>
      </div>
    </div>
  );
};
CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
};

const mapDispatchToProps = {
  setNewFavorite,
  deleteNewFavorite,
  // deleteFavorite,
};
export default connect(null, mapDispatchToProps)(CarouselItem);
