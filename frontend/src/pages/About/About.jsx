import React from 'react';
import './About.css';

// I am still learning how to break this into smaller components
// for now keeping everything in one file

function About() {

  // I tried to use a separate data file but kept it here for simplicity
  const values = [
    {
      id: 1,
      icon: '✦',
      title: 'Quality First',
      desc: 'Every piece is crafted from premium materials, built to be worn and loved for years.'
    },
    {
      id: 2,
      icon: '♻',
      title: 'Sustainability',
      desc: 'We source ethically, reduce waste, and invest in eco-conscious production.'
    },
    {
      id: 3,
      icon: '❤',
      title: 'Inclusivity',
      desc: 'Fashion for every body, every age, every story. Real style knows no limits.'
    },
    {
      id: 4,
      icon: '✿',
      title: 'Timeless Design',
      desc: 'We design beyond trends, creating pieces that remain beautiful season after season.'
    }
  ];

  return (
    <div className="about-page">

      {/* top banner section */}
      <div className="about-top">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80"
          alt="About Shivora"
          className="about-top-img"
        />
        <div className="about-top-text">
          <p className="about-small-label">Our Story</p>
          <h1 className="about-heading">Fashion with Purpose & Soul</h1>
          <p className="about-subtext">
            We believe every woman deserves to feel extraordinary.
          </p>
        </div>
      </div>

      {/* mission section */}
      <div className="about-mission">
        <div className="about-mission-text">
          <p className="about-small-label">Our Mission</p>
          <h2 className="about-mission-title">Dressing Women for Every Chapter</h2>

          <p className="about-mission-para">
            Shivora was started with a simple belief — great fashion is not a luxury,
            it is a form of self-expression. We create pieces that move with you every day.
          </p>

          <p className="about-mission-para">
            Every garment is thoughtfully designed, ethically produced, and built to last.
            We say no to fast fashion and yes to timeless quality.
          </p>

          {/* I learned about using anchor tag with react-router but for now using a tag */}
          <a href="/shop" className="about-shop-btn">Explore Collection</a>
        </div>

        <div className="about-mission-images">
          <img
            src="https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80"
            alt="fashion shoot"
            className="about-img-1"
          />
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80"
            alt="model"
            className="about-img-2"
          />
        </div>
      </div>

      {/* values section */}
      <div className="about-values-section">
        <p className="about-small-label" style={{ textAlign: 'center' }}>What We Stand For</p>
        <h2 className="about-values-title">Our Values</h2>

        <div className="about-values-grid">
          {values.map(function(item) {
            return (
              <div key={item.id} className="about-value-box">
                <div className="about-value-icon">{item.icon}</div>
                <h3 className="about-value-name">{item.title}</h3>
                <p className="about-value-text">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default About;
