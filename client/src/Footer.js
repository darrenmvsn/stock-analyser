import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div class="container footer-container">
    <footer class="py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-primary">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-primary">Features</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-primary">Pricing</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-primary">FAQs</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-primary">About</a></li>
      </ul>
      <p class="text-center text-body-primary">© 2023 Company, Inc</p>
    </footer>
  </div>
  )
}

export default Footer
