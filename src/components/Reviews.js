import React from 'react';
import PropTypes from 'prop-types';

const Reviews = ({ reviews }) => {
    return (
        <div className="reviews">
            {reviews.map((review, index) => (
                <div key={index} className="review-item">
                    <strong>{review.author}</strong> <span>({review.rating}★)</span>
                    <p>{review.text}</p>
                </div>
            ))}
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