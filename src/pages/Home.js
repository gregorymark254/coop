import React from 'react';

const Home = () => {
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

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <span>Products</span>
            <div className='border border-black p-4 rounded-lg mt-4'>
              <div className="flex items-center justify-around">
                <span>Product name</span>
                <span>Price</span>
              </div>
            </div>
          </div>
          <div>
            <span>Selected Products</span>
            <div className='border border-black p-4 rounded-lg mt-4'>
              <div className="flex items-center justify-around">
                <span>Product name</span>
                <span>Price</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
