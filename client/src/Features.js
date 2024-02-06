import React from 'react'
import './Features.css'
const Features = () => {
  return (
    <div class="container px-4 py-5 pricing-container" id="hanging-icons">
    <h2 class="pb-2 border-bottom">Our features</h2>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-1-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312V4.002Z"/>
</svg>
        </div>
        <div>
          <h3 class="fs-2 ">Qualitative Analysis</h3>
          <p>Uncover the story behind the numbers with our powerful qualitative analysis tools. Dive deep into company profiles, industry trends, and market sentiments. Our platform provides comprehensive insights into a company's mission, leadership, and competitive positioning, enabling users to make informed investment decisions beyond quantitative data.</p>
          <a href="#" class="btn btn-primary">
            Learn more
          </a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-2-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z"/>
</svg>
        </div>
        <div>
          <h3 class="fs-2 ">Stock screener</h3>
          <p>Effortlessly filter through thousands of stocks to find the perfect investment opportunities. Our stock screening feature allows users to set custom criteria based on financial metrics, market performance, and industry trends. Whether you're a value investor, growth seeker, or income-focused, our intuitive stock screening empowers you to discover stocks that align with your investment strategy.
          </p>
          <a href="#" class="btn btn-primary">
            Learn more
          </a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-3-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8.082.414c.92 0 1.535.54 1.541 1.318.012.791-.615 1.36-1.588 1.354-.861-.006-1.482-.469-1.54-1.066H5.104c.047 1.177 1.05 2.144 2.754 2.144 1.653 0 2.954-.937 2.93-2.396-.023-1.278-1.031-1.846-1.734-1.916v-.07c.597-.1 1.505-.739 1.482-1.876-.03-1.177-1.043-2.074-2.637-2.062-1.675.006-2.59.984-2.625 2.12h1.248c.036-.556.557-1.054 1.348-1.054.785 0 1.348.486 1.348 1.195.006.715-.563 1.237-1.342 1.237h-.838v1.072h.879Z"/>
</svg>
        </div>
        <div>
          <h3 class="fs-2 ">Financial statement analysis</h3>
          <p>Make smarter investment decisions with our robust financial statement analysis tools. Visualize and interpret balance sheets, income statements, and cash flow statements with ease. Our platform goes beyond raw data, providing dynamic charts, ratios, and trend analyses to help users understand a company's financial health and performance over time. Whether you're a seasoned analyst or a novice investor, our financial statement analysis feature simplifies complex financial data for better decision-making.</p>
          <a href="#" class="btn btn-primary">
            Learn more
          </a>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Features
