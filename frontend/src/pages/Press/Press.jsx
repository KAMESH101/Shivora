import React from 'react';
import '../../styles/generic-page.css';

function Press() {
  return (
    <div className="generic-page">
      <h1 className="generic-page__title">Press & Media</h1>
      <div className="generic-page__content">
        <p>Welcome to the Shivora press room. Here you will find our latest announcements, media features, and brand assets.</p>
        
        <h2>Media Inquiries</h2>
        <p>For all press and media inquiries, including sample requests, interviews, and high-resolution images, please contact our PR team:</p>
        <p><strong>Email:</strong> press@shivora.com<br/><strong>Phone:</strong> +1 (555) 123-4567</p>

        <h2>Brand Guidelines</h2>
        <p>If you are featuring Shivora in an upcoming publication, please adhere to our brand guidelines. You can download our official media kit, which includes our logo suite, typography rules, and brand colors.</p>
        <p><a href="#">Download Media Kit (.zip)</a></p>
        
        <h2>Recent Coverage</h2>
        <ul>
          <li><em>Vogue:</em> "The Rise of Shivora's Minimalist Aesthetic" - Fall 2024</li>
          <li><em>Harper's Bazaar:</em> "Brands Redefining Sustainable Luxury" - Summer 2024</li>
          <li><em>Elle:</em> "The 10 Wardrobe Essentials Every Woman Needs" - Spring 2024</li>
        </ul>
      </div>
    </div>
  );
}

export default Press;
