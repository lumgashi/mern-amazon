import { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../util/baseUrl";
import logger from "use-reducer-logger";
import LoadingSpinner from "../util/LoadingSpinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import ErrorPage from "../util/ErrorPage";
import {Helmet} from 'react-helmet-async'


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAILED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  // const [products, setProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: "FETCH_REQUEST" }); 
      try {
        const result = await axios.get(`${baseUrl}/api/products`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILED", payload: error.message });
      }
    };

    getProducts();
  }, []);

  return (
    <>
    <Helmet>
      <title>Amazona</title>
    </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorPage error={error} />
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3}>
                <Product  product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
}
export default HomeScreen;
