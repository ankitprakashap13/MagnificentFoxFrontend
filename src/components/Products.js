import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../atoms/card/ProductCard';
import ProductFilters from './ProductFilters';
import '../css/Products.css';

const API_BASE_URL = 'https://api.magnificentfox.shop/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    tags: [],
    priceRange: [0, 10000],
    sortBy: 'name',
    offers: false,
    sizes: [],
    fabric: '',
    rating: 0
  });

  useEffect(() => {
    fetchProducts();
  }, [selectedCountry]);

  useEffect(() => {
    applyFilters();
  }, [products, filters, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products/`);
      const countryFilteredProducts = response.data.filter(product => 
        product.countries.some(country => country.code === selectedCountry)
      );
      setProducts(countryFilteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(product =>
        product.tags.some(tag => filters.tags.includes(tag.name))
      );
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Offers filter
    if (filters.offers) {
      filtered = filtered.filter(product => product.offers.length > 0);
    }

    // Sizes filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product => {
        if (!product.sizes) return false;
        const productSizes = product.sizes.split(',').map(s => s.trim().toLowerCase());
        return filters.sizes.some(size => productSizes.includes(size.toLowerCase()));
      });
    }

    // Fabric filter
    if (filters.fabric) {
      filtered = filtered.filter(product =>
        product.fabric_and_care?.toLowerCase().includes(filters.fabric.toLowerCase())
      );
    }

    // Rating filter (assuming 4+ rating for customer reviews)
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.customer_reviews);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  const transformProductForCard = (product) => ({
    ...product,
    imageUrl: product.images?.[0]?.image || '',
    price: parseFloat(product.price) * 100,
    salePrice: product.mrp ? parseFloat(product.mrp) * 100 : null,
    link: `#product-${product.id}`
  });

  if (loading) {
    return <div className="products-loading">Loading products...</div>;
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Products</h1>
        <div className="country-selector">
          <label>Country: </label>
          <select value={selectedCountry} onChange={(e) => handleCountryChange(e.target.value)}>
            <option value="IN">India</option>
            <option value="NZ">New Zealand</option>
          </select>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="products-container">
        <ProductFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          products={products}
        />
        
        <div className="products-grid">
          <div className="products-count">
            {filteredProducts.length} products found
          </div>
          
          <div className="products-list">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                card={transformProductForCard(product)}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="no-products">
              No products found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;