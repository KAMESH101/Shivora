import React from 'react';
import '../../styles/generic-page.css';

function Sustainability() {
  return (
    <div className="generic-page">
      <h1 className="generic-page__title">Sustainability at Shivora</h1>
      <div className="generic-page__content">
        <p>Fashion should not come at the cost of our planet. At Shivora, we are committed to making choices that respect the earth and the people who inhabit it.</p>
        
        <h2>Ethical Sourcing</h2>
        <p>We partner exclusively with factories and suppliers that guarantee fair wages, safe working conditions, and ethical labor practices. Every piece of clothing we make is traced from fabric origin to final stitch.</p>
        
        <h2>Eco-Friendly Materials</h2>
        <p>Over 70% of our collections are made from organic, recycled, or upcycled materials. We are constantly searching for innovative fabrics that reduce our environmental footprint without sacrificing quality or feel.</p>
        
        <h2>Zero-Waste Initiatives</h2>
        <ul>
          <li><strong>Packaging:</strong> All our shipping materials are 100% recyclable or compostable.</li>
          <li><strong>Production:</strong> We utilize pattern-making techniques that minimize fabric waste. Scraps are donated to local recycling facilities.</li>
          <li><strong>Longevity:</strong> The most sustainable garment is the one that lasts. We design timeless pieces that withstand the test of time, reducing the need to constantly replace your wardrobe.</li>
        </ul>
        
        <h2>Our Goal for 2030</h2>
        <p>We are working hard to become a carbon-neutral company by 2030. Thank you for supporting us on this journey towards a more sustainable future.</p>
      </div>
    </div>
  );
}

export default Sustainability;
