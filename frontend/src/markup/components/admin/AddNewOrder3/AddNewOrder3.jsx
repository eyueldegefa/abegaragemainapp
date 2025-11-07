import React from 'react'
import CustomerData from '../CustomerData/CustomerData'
import CustomerVehicle from '../CustomerVehicle/CustomerVehicle'
// import css
import './AddNewOrder3.css'

function AddNewOrder3() {
  return (
    <section className='container-fluid auto-container contact-section px-4 add-new-order-3'>
      <div className="contact-title">
        <h2>Create a new order</h2>
      </div>
      <div>
        <CustomerData />
      </div>    
      <div>
        <CustomerVehicle />
      </div>

      <div className=' my-1 shadow p-2'>
        <div className='shadow-sm p-2 my-2 service-options'>
            <div>
                <h4>Oil Change</h4>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque possimus esse adipisci. Minima, voluptates. Voluptas quia repellat, porro odio unde recusandae reprehenderit, assumenda veritatis consequatur ipsam fugit, aut soluta voluptates!</p>
            </div>
            <input type="checkbox" name="oilChange" id="" />
        </div>

        <div className='shadow-sm p-2 my-2 service-options'>
            <div>
                <h4>Brake Inspection</h4>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque possimus esse adipisci. Minima, voluptates. Voluptas quia repellat, porro odio unde recusandae reprehenderit, assumenda veritatis consequatur ipsam fugit, aut soluta voluptates!</p>
            </div>
            <input type="checkbox" name="brakeInspection" id="" />
        </div>

        <div className='shadow-sm p-2 my-1 service-options'>
            <div>
                <h4>Tire Rotation</h4>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque possimus esse adipisci. Minima, voluptates. Voluptas quia repellat, porro odio unde recusandae reprehenderit, assumenda veritatis consequatur ipsam fugit, aut soluta voluptates!</p>
            </div>
            <input type="checkbox" name="tireRotation" id="" />
        </div>

        <div className='shadow-sm p-2 my-1 service-options'>
            <div>
                <h4>Engine Diagnostic</h4>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque possimus esse adipisci. Minima, voluptates. Voluptas quia repellat, porro odio unde recusandae reprehenderit, assumenda veritatis consequatur ipsam fugit, aut soluta voluptates!</p>
            </div>
            <input type="checkbox" name="engineDiagnostic" id="" />
        </div>
      </div>
    </section>
  )
}

export default AddNewOrder3