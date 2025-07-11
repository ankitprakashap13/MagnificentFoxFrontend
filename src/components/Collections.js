import React from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import '../css/CardList.css';

const Collections = ({ products }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="collections">
            <Carousel 
                responsive={responsive}
                settings={{
                    slidesToShow: 4,
                    arrows: true,
                    dots: false,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 3000
                }}
            >
                {(products || []).map(product => (
                    <div key={product.id} className="collection-item">
                        <img 
                            src={product.imageUrl || product.images?.[0]?.image} 
                            alt={product.name}
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                objectPosition: 'center'
                            }}
                        />
                        <h3>{product.name}</h3>
                        <p>₹{product.price}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

Collections.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Collections;
