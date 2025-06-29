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
        const cardListResponse = await axios.get(`${API_BASE_URL}/card-list-data`);
        setCardListData(cardListResponse.data);

        const columnStructureResponse = await axios.get(`${API_BASE_URL}/column-structure-data`);
        setColumnStructureData(columnStructureResponse.data);

        const favouritesResponse = await axios.get(`${API_BASE_URL}/favourites-data`);
        setFavouritesData(favouritesResponse.data);

        const reviewsResponse = await axios.get(`${API_BASE_URL}/reviews-data`);
        setReviewsData(reviewsResponse.data);

        const videoCardsResponse = await axios.get(`${API_BASE_URL}/video-cards-data`);
        setVideoCardsData(videoCardsResponse.data);

        const productsResponse = await axios.get(`${API_BASE_URL}/products`);
        const orderItems = productsResponse.data && productsResponse.data.order_items ? productsResponse.data.order_items : [];
        const productsData = orderItems.map(item => ({
          product: item.product,
          quantity: item.quantity,
          price: item.price
        }));
        setProducts(productsData);
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
                    <Collections cards={cardListData || []} />
                    <SloganSection slogan="Our Slogan" />
                    <ColumnStructure data={columnStructureData || []} />
                    <Favourites cards={favouritesData || []} />
                    <Reviews reviews={reviewsData || []} />
                    <VideoCards cards={videoCardsData || []} />
                    <Footer theme={theme.footer} />
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
