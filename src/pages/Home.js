import React, { useEffect, useState } from 'react';
import axios from '../api/api';

const Home = () => {

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [walletBalance, setWalletBalance] = useState(2400);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/products?limit=5&skip=0');
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const existingProductIndex = selectedProducts.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      // If the product exists, increase its quantity
      const updatedSelectedProducts = [...selectedProducts];
      updatedSelectedProducts[existingProductIndex].quantity += 1;
      setSelectedProducts(updatedSelectedProducts);
    } else {
      // If the product is new, add it to the cart with quantity 1
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (product) => {
    const updatedSelectedProducts = selectedProducts.filter(
      (item) => item._id !== product._id
    );
    setSelectedProducts(updatedSelectedProducts);
  };

  const handleDeduction = async () => {
    try {
      // Simulated deduction logic - replace with your actual API call
      const totalDeduction = selectedProducts.reduce((sum, product) => {
        return sum + product.price * product.quantity;
      }, 0);

      if (walletBalance >= totalDeduction) {
        setWalletBalance(walletBalance - totalDeduction);
      } else {
        alert("Insufficient wallet balance");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className='mx-auto p-4'>
        <h3>Product Details</h3>
        <div className='flex items-center space-x-4 my-4'>
          <button className='bg-[#E8B40A] text-white px-4 py-1 rounded-md'>Back</button>
          <h6>Product Details</h6>
        </div>

        <div>
          <h6><b>Inua mkulima wallet</b> balance: <b>Kes {walletBalance}</b></h6>
        </div>

        {loading ? (
          <h3>Loading....</h3>
        ) : (
          error ? (
            <h3>Error: {error.message}</h3>
          ) : (
            products.length === 0 ? (
              <h3>No products found</h3>
            ) : (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 space-y-4">
                <div>
                  <span>Products</span>
                  <div className='border border-black p-4 rounded-lg mt-4'>
                    <div className="grid grid-cols-2">
                      <span><b>Product name</b></span>
                      <span><b>Price</b></span>
                    </div>
                    {products.map((product, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 py-2">
                        <span>{product.title}</span>
                        <span>{product.price} kes</span>
                        <button className='border border-black rounded-full p-2 w-10' onClick={() => handleAddToCart(product)}>+</button>
                      </div>
                    ))}
                  </div>
                  <button className='border border-black text-black px-6 py-2 rounded-md'>Back</button>
                </div>
                <div className='space-y-6'>
                  <span>Selected Products</span>
                  <div className='border border-black p-4 rounded-lg mt-4'>
                    <div className="grid grid-cols-6 gap-2 py-2">
                      <span>Product name</span>
                      <span>Qty</span>
                      <span>Price</span>
                      <span>Total</span>
                      <span>Deduction</span>
                    </div>
                    {selectedProducts.map((product, index) => (
                      <div>
                        <div key={index} className="grid grid-cols-6 gap-2 py-2">
                          <span>{product.title}</span>
                          <span>{product.price} kes</span>
                          <span>{product.price} kes</span>
                          <span>{product.price} kes</span>
                          <span>{product.price} kes</span>
                          <button className='border border-black rounded-full p-2 w-10' onClick={() => handleRemoveFromCart(product)}>-</button>
                        </div>
                        <div className="flex items-center justify-between">
                          <h4>Total</h4>
                          <h4><u>1400</u></h4>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className='bg-black text-white px-6 py-2 rounded-md' onClick={handleDeduction}>Deduct 1400.00 kes</button>
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