import React, { useState, useEffect } from 'react';
import '../css/ProductFilters.css';

const ProductFilters = ({ filters, onFilterChange, products }) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);

  useEffect(() => {
    // Extract unique tags from products
    const tags = [...new Set(products.flatMap(p => p.tags.map(t => t.name)))];
    setAvailableTags(tags);

    // Extract unique sizes from products
    const sizes = [...new Set(
      products
        .filter(p => p.sizes)
        .flatMap(p => p.sizes.split(',').map(s => s.trim()))
    )];
    setAvailableSizes(sizes);
  }, [products]);

  const handleTagChange = (tag) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    onFilterChange({ ...filters, tags: newTags });
  };

  const handleSizeChange = (size) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handlePriceRangeChange = (min, max) => {
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  const clearAllFilters = () => {
    onFilterChange({
      tags: [],
      priceRange: [0, 10000],
      sortBy: 'name',
      offers: false,
      sizes: [],
      fabric: '',
      rating: 0
    });
  };

  return (
    <div className="product-filters">
      <div className="filters-header">
        <h3>Filters</h3>
        <button onClick={clearAllFilters} className="clear-filters">
          Clear All
        </button>
      </div>

      {/* Sort By */}
      <div className="filter-section">
        <h4>Sort By</h4>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
        >
          <option value="name">Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceRangeChange(parseInt(e.target.value) || 0, filters.priceRange[1])}
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value) || 10000)}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="filter-section">
        <h4>Tags</h4>
        <div className="checkbox-group">
          {availableTags.map(tag => (
            <label key={tag} className="checkbox-item">
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={() => handleTagChange(tag)}
              />
              {tag.replace('-', ' ')}
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="filter-section">
        <h4>Sizes</h4>
        <div className="checkbox-group">
          {availableSizes.map(size => (
            <label key={size} className="checkbox-item">
              <input
                type="checkbox"
                checked={filters.sizes.includes(size)}
                onChange={() => handleSizeChange(size)}
              />
              {size.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      {/* Offers */}
      <div className="filter-section">
        <h4>Special Offers</h4>
        <label className="checkbox-item">
          <input
            type="checkbox"
            checked={filters.offers}
            onChange={(e) => onFilterChange({ ...filters, offers: e.target.checked })}
          />
          Products with offers
        </label>
      </div>

      {/* Fabric */}
      <div className="filter-section">
        <h4>Fabric</h4>
        <input
          type="text"
          placeholder="Search fabric..."
          value={filters.fabric}
          onChange={(e) => onFilterChange({ ...filters, fabric: e.target.value })}
        />
      </div>

      {/* Customer Rating */}
      <div className="filter-section">
        <h4>Customer Rating</h4>
        <label className="checkbox-item">
          <input
            type="checkbox"
            checked={filters.rating > 0}
            onChange={(e) => onFilterChange({ ...filters, rating: e.target.checked ? 4 : 0 })}
          />
          4+ Stars (with reviews)
        </label>
      </div>
    </div>
  );
};

export default ProductFilters;