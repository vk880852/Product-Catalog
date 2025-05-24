import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
        console.log(`Something went wrong while accessing data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return null;

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)}>Back to Products</button>
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p className="price">${product.price}</p>
      <p>{product.description}</p>
      <span className="category">{product.category}</span>
    </div>
  );
}

export default ProductDetail;
