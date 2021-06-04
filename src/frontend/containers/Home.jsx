import React from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';

// import useInitialState from "../hooks/useInitialState.js"
import '../assets/styles/App.scss';
import Header from '../components/Header';

const Home = ({ myList, trends, originals, searchResults }) => {
  return (
    <div className='App'>
      <Header />
      <Search isHome />
      {
        Object.keys(searchResults).length > 0 && (
          <Categories title='Search results'>
            <Carousel>
              {
                searchResults.map(item => <CarouselItem key={item.id} {...item} />)
              }
            </Carousel>
          </Categories>
        )
      }
      {myList.length > 0 && (
        <Categories title='My list'>
          <Carousel>
            {myList.map(list => <CarouselItem key={list.id} {...list} isList />)}
          </Carousel>
        </Categories>
      )}
      <Categories title='On trend'>
        <Carousel>
          {trends.map(item => <CarouselItem key={item.id} {...item} />)}
          <CarouselItem />
        </Carousel>
      </Categories>

      <Categories title='Originals'>
        <Carousel>
          {originals.map(origin => <CarouselItem key={origin.id} {...origin} />)}
        </Carousel>
      </Categories>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
    searchResults: state.searchResults,
  };
};
export default connect(mapStateToProps, null)(Home);
