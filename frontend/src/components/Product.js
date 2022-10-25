import {useContext} from "react";
import { Link,useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../store";
import axios from "axios";
import { baseUrl } from "../util/baseUrl";




const Product = (props) => {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: {cartItems} } = state;
  const navigate = useNavigate()

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(
      `${baseUrl}/api/products/${product._id}`
    );

    if (data.countInStock < quantity) {
      const notifyError = () => {
        toast.error("Sorry, this product is out of stock", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      };
      notifyError();
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });

    navigate('/cart'); 
  };


  return (
    <Card className="product" key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>

      <Card.Body>
        <Link className="card-title" to={`/product/${product.slug}`}>
          <Card.Title >{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? <Button variant='light' disabled>Out of Stock</Button>
        : <Button onClick={()=>addToCartHandler(product)} className="btn-primary">Add to Cart</Button>
        }
        
      </Card.Body>
      <ToastContainer />
    </Card>
  );
};

export default Product;
