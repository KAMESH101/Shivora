// run this once to seed products into MongoDB
// node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');

const products = [
  {
    name: 'Silk Wrap Dress',
    category: 'Dresses',
    price: 1499,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
    colors: ['#c9a98a', '#6da9b5', '#1a1a1a'],
    rating: 4,
    reviews: 128,
    isNew: false,
  },
  {
    name: 'Linen Blazer Set',
    category: 'Blazers',
    price: 2499,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e30?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e30?w=600&q=80',
    colors: ['#f0ebe4', '#8b7355', '#1a1a1a'],
    rating: 5,
    reviews: 64,
    isNew: true,
  },
  {
    name: 'Floral Maxi Skirt',
    category: 'Skirts',
    price: 999,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80',
    colors: ['#e8f4f7', '#d4a5a5', '#6da9b5'],
    rating: 4,
    reviews: 95,
    isNew: false,
  },
  {
    name: 'Cashmere Sweater',
    category: 'Tops',
    price: 1799,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    colors: ['#c9a98a', '#e8d5b7', '#6da9b5'],
    rating: 5,
    reviews: 203,
    isNew: true,
  },
  {
    name: 'Tailored Trousers',
    category: 'Bottoms',
    price: 1299,
    originalPrice: 1699,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
    colors: ['#1a1a1a', '#5b5b5b', '#f0ebe4'],
    rating: 4,
    reviews: 77,
    isNew: false,
  },
  {
    name: 'Satin Slip Dress',
    category: 'Dresses',
    price: 1899,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    colors: ['#c9a98a', '#1a1a1a', '#6da9b5'],
    rating: 5,
    reviews: 141,
    isNew: true,
  },
  {
    name: 'Cropped Denim Jacket',
    category: 'Jackets',
    price: 1499,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=600&q=80',
    colors: ['#4a6b8a', '#8899aa', '#1a1a1a'],
    rating: 4,
    reviews: 89,
    isNew: false,
  },
  {
    name: 'Ruffle Blouse',
    category: 'Tops',
    price: 799,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80',
    colors: ['#fff', '#f0ebe4', '#6da9b5'],
    rating: 4,
    reviews: 52,
    isNew: false,
  },
];

async function seed() {
  await connectDB();
  
  // Seed Products
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Products seeded successfully');

  // Seed Default User
  await User.deleteMany({});
  await User.create({
    name: 'Shivora Evaluator',
    email: 'evaluator@shivora.com',
    password: 'password123',
  });
  console.log('Test User seeded successfully (Credentials: evaluator@shivora.com / password123)');

  mongoose.connection.close();
}

seed();
