// import "./PlaceOrder.css";

// // Stub for now — we'll build the full delivery details form
// // and order summary in the "Create Place order page" step.
// export default function PlaceOrder() {
//   return (
//     <div className="app-container place-order-stub">
//       <h1>Delivery details</h1>
//       <p className="place-order-note">Full checkout form coming in the next step.</p>
//     </div>
//   );
// }


import React from 'react'
import './PlaceOrder.css'

const PlaceOrder = () => {
  return (
    <form className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>
        <input type="email" placeholder='Email address' />
        <input type="text" placeholder='Street' />
        <div className='multi-fields'>
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className='multi-fields'>
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>
      <div className='place-order-right'>
        
      </div>
    </form>
  )
}

export default PlaceOrder