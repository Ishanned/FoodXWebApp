import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Navbar() {

  const [cartView, setcartView] = useState(false)
  let data = useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")

  }
  return (<div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-success" style={{ backgroundColor: 'green' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">FoodX</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
            </li>
            {(localStorage.getItem("authToken")) ?
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
              </li>
              : ""}

          </ul>
          {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" style={{ backgroundColor: 'white', color: 'green' }} to="/login">login</Link>

              <Link className="btn bg-white text-success mx-1" style={{ backgroundColor: 'white', color: 'green' }} to="/createuser">Signup</Link>
            </div>
            :
            <div><div className="btn bg-white text-success mx-2" style={{ backgroundColor: 'white', color: 'green', position: 'relative' }} onClick={() => { setcartView(true) }}>
              My Cart{" "}
              <span
                className="position-absolute top-0 start-100 translate-middle p-2 bg-danger rounded-circle"
                style={{
                  width: '24px', // Fixed width
                  height: '24px', // Fixed height
                  backgroundColor: 'red',
                  border: '2px solid #fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px', // Adjust font size
                }}
              >
                <span className="visually-hidden">New alerts</span>
                <span style={{ color: 'white' }}>{data.length}</span>
              </span>



            </div>
              {cartView ? <Modal onClose={() => setcartView(false)}><Cart /></Modal> : null}
              <div className="btn bg-white text-success mx-2" style={{ backgroundColor: 'white', color: 'red' }} onClick={handleLogout}>
                Logout
              </div>
            </div>}
        </div>
      </div>
    </nav>
  </div>
  )

}
