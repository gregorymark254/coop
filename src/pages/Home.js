import React, { useEffect, useState } from 'react';
import axios from '../api/api';

const Home = () => {

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getproduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/products?limit=5&skip=0');
      setProduct(response.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    getproduct();
  }, []);

  return (
    <main>
      <div className='mx-auto p-4'>
        <h3>Product Details</h3>
        <div className='flex items-center space-x-4 my-4'>
          <button className='bg-[#E8B40A] text-white px-4 py-1 rounded-md'>Back</button>
          <h6>Product Details</h6>
        </div>

        <div>
          <h6><b>Inua mkulima wallet</b> balance: <b>Kes 2,400</b></h6>
        </div>

        {loading ? (
          <h3>Loading....</h3>
        ) : (
          error ? (
            <h3>Error: {error.message}</h3>
          ) : (
            product.length === 0 ? (
              <h3>No products found</h3>
            ) : (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div>
                  <span>Products</span>
                  <div className='border border-black p-4 rounded-lg mt-4'>
                    <div className="grid grid-cols-2">
                      <span><b>Product name</b></span>
                      <span><b>Price</b></span>
                    </div>
                    {product.map((product, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 py-2">
                        <span>{product.title}</span>
                        <span>{product.price} kes</span>
                        <button className='border border-black rounded-full p-2 w-10'>+</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <span>Selected Products</span>
                  <div className='border border-black p-4 rounded-lg mt-4'>
                    <div className="flex items-center justify-around">
                      <span>Product name</span>
                      <span>Price</span>
                    </div>
                    {/* Add selected products here if needed */}
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
    </main>
  );
};

export default Home;
