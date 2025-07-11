import React from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import '../css/Reviews.css';

const Reviews = ({ reviews }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 1,
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="reviews">
            <Carousel 
                responsive={responsive}
                settings={{
                    slidesToShow: 1,
                    arrows: true,
                    dots: false,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 5000
                }}
            >
                {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <strong>{review.author}</strong> <span>({review.rating}★)</span>
                        <p>{review.text}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

Reviews.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            author: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        })
    ).isRequired,
};

export default Reviews;