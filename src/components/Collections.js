import React from 'react';
import PropTypes from 'prop-types';
import '../css/CardList.css';

const Collections = ({ products }) => {
    return (
        <div className="collections">
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
        </div>
    );
};

Collections.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Collections;
