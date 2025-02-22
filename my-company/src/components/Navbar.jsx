import { Link } from "react-router-dom";
import React from 'react'

function Navbar() {
  return (
      <div style={{ backgroundColor: "navy", color: "white", textAlign: "center", padding:"15px" }}>
          <Link to='/'>Home</Link>
          <Link to='/About'>About</Link>
          <Link to='/Services'>Services</Link>
          <Link to='/Contact'>Contact</Link>
    </div>
  )
}

export default Navbar