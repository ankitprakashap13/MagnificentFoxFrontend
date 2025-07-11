import React from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import ProductCard from '../atoms/card/ProductCard';

const Favourites = ({ products }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <Carousel 
      responsive={responsive} 
      settings={{
        slidesToShow: 6,
        arrows: true,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000
      }}
    >
      {(products || []).filter(product => product.quantity > 0).map(product => (
        <ProductCard key={product.id} card={product} />
      ))}
    </Carousel>
  );
};

Favourites.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Favourites;
