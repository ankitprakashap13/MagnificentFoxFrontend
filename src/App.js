import './css/App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, StyleReset } from 'atomize';
import { ThemeContextProvider } from './core/ThemeContext';
import OffersBanner from './components/OffersBanner';
import Navigation from './components/Navigation';
import SloganSection from './components/SloganSection';
import ColumnStructure from './components/ColumnStructure';
import Footer from './components/Footer';
import SlideShow from './components/SlideShow';
import Collections from './components/Collections';
import Favourites from './components/Favourites';
import Reviews from './components/Reviews';
import VideoCards from './components/VideoCards';
import Products from './components/Products';
import NotFound from './components/NotFound';

const theme = {
  offersBanner: {
    background: '#e7d9be',
  },
  navigation: {
    background: '#fff',
    color: '#000',
  },
  footer: {
    background: '#e7d9be',
  },
};

const API_BASE_URL = 'https://api.magnificentfox.shop/api';

// Tags configuration for different data types
const API_TAGS_CONFIG = {
  cardList: ['NEW-ARRIVALS', 'TRENDING'],
  columnStructure: ['BESTSELLER', 'PREMIUM'],
  favourites: ['EDITORIAL', 'CUSTOMER-FAVORITE'],
  reviews: ['STAFF-PICKS', 'VALUE-FOR-MONEY'],
  videoCards: ['HAS-VIDEO']
};

function App() {
  const [cardListData, setCardListData] = useState([]);
  const [columnStructureData, setColumnStructureData] = useState([]);
  const [favouritesData, setFavouritesData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [videoCardsData, setVideoCardsData] = useState([]);
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch card list data
        const cardListResponse = await axios.get(`${API_BASE_URL}/products/?tags=${API_TAGS_CONFIG.cardList.join(',')}`);
        setCardListData(cardListResponse.data);

        // Fetch column structure data
        const columnStructureResponse = await axios.get(`${API_BASE_URL}/products/?tags=${API_TAGS_CONFIG.columnStructure.join(',')}`);
        setColumnStructureData(columnStructureResponse.data);

        // Fetch favourites data
        const favouritesResponse = await axios.get(`${API_BASE_URL}/products/?tags=${API_TAGS_CONFIG.favourites.join(',')}`);
        setFavouritesData(favouritesResponse.data);

        // Fetch reviews data
        const reviewsResponse = await axios.get(`${API_BASE_URL}/products/?tags=${API_TAGS_CONFIG.reviews.join(',')}`);
        setReviewsData(reviewsResponse.data);

        // Fetch video cards data
        const videoCardsResponse = await axios.get(`${API_BASE_URL}/products/?tags=${API_TAGS_CONFIG.videoCards.join(',')}`);
        setVideoCardsData(videoCardsResponse.data);

        // Fetch all products
        const productsResponse = await axios.get(`${API_BASE_URL}/products`);
        setProducts(productsResponse.data || []);
      } catch (error) {
        console.error("Error fetching data from API:", error);
        setApiError(true);
      }
    };

    fetchData();
  }, []);

  const apiErrorBanner = apiError ? (
    <div style={{ background: '#ffcccc', color: '#900', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
      Unable to fetch data from the server. Some features may not be available.
    </div>
  ) : null;

  return (
    <ThemeContextProvider>
      <ThemeProvider theme={theme}>
        <StyleReset />
        <Router>
          <div className="App">
            <div className="container">
              {apiErrorBanner}
              <OffersBanner theme={theme.offersBanner} />
              <Navigation theme={theme.navigation} />
              <header className="App-header">
                <Switch>
                  <Route exact path="/">
                    <SlideShow products={products || []} />
                    <Collections products={(cardListData || []).map(product => ({
                      ...product,
                      imageUrl: product.images?.[0]?.image || '',
                      price: parseFloat(product.price) * 100,
                      salePrice: product.mrp ? parseFloat(product.mrp) * 100 : null,
                      link: `#product-${product.id}`
                    }))} />
                    <SloganSection slogan="Our Slogan" />
                    <ColumnStructure data={{
                      sections: [{
                        columns: (columnStructureData || []).map(product => ({
                          image: product.images?.[0]?.image || '',
                          link: `#product-${product.id}`,
                          text: {
                            title: product.name,
                            description: product.description
                          }
                        }))
                      }]
                    }} />
                    <Favourites products={(favouritesData || []).map(product => ({
                      ...product,
                      imageUrl: product.images?.[0]?.image || '',
                      price: parseFloat(product.price) * 100,
                      salePrice: product.mrp ? parseFloat(product.mrp) * 100 : null,
                      link: `#product-${product.id}`
                    }))} />
                    <Reviews reviews={(reviewsData || []).map(product => ({
                      author: 'Customer',
                      rating: 5,
                      text: product.customer_reviews || 'Great product!'
                    }))} />
                    <VideoCards cards={(videoCardsData || []).map(product => ({
                      video: product.videos?.[0]?.url || '',
                      products: [{
                        title: product.name,
                        link: `#product-${product.id}`
                      }]
                    }))} />
                    <Footer theme={theme.footer} />
                  </Route>
                  <Route path="/products">
                    <Products />
                  </Route>
                  <Route>
                    <NotFound />
                  </Route>
                </Switch>
              </header>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </ThemeContextProvider>
  );
}

export default App;
