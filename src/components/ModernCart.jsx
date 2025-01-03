import React, { useState, useRef } from 'react';
import { ShoppingCart, Plus, Star } from 'lucide-react';

const ModernCart = () => {
  const [cartItems, setCartItems] = useState(0);
  const [flyingItems, setFlyingItems] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const cartRef = useRef(null);
  
  const products = [
    {
      id: 1,
      name: "Nike Air Max",
      price: "159.99€",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      rating: 4.8,
      image: "/givency_purse.webp"
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: "179.99€",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      rating: 4.9,
      image: "/g9.webp"
    },
    {
      id: 3,
      name: "Puma RS-X",
      price: "129.99€",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      rating: 4.7,
      image: "/clementines.webp"
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: "179.99€",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      rating: 4.9,
      image: "/g9.webp"
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: "179.99€",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      rating: 4.9,
      image: "/g9.webp"
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: "179.99€",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      rating: 4.9,
      image: "/g9.webp"
    }
  ];

  const addToCart = (product, buttonElement) => {
    const buttonRect = buttonElement.getBoundingClientRect();
    const cartRect = cartRef.current.getBoundingClientRect();
    
    const flyingId = Date.now();
    const newFlyingItem = {
      id: flyingId,
      product,
      start: {
        x: buttonRect.left,
        y: buttonRect.top
      },
      end: {
        x: cartRect.left + cartRect.width / 2 - 30,
        y: cartRect.top + cartRect.height / 2 - 30
      }
    };

    setFlyingItems(prev => [...prev, newFlyingItem]);
    setActiveProduct(product.id);

    setTimeout(() => {
      setFlyingItems(prev => prev.filter(item => item.id !== flyingId));
      setCartItems(prev => prev + 1);
      setActiveProduct(null);
      
      cartRef.current.classList.add('scale-125');
      setTimeout(() => {
        cartRef.current.classList.remove('scale-125');
      }, 200);
    }, 1000);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      {/* En-tête fixe avec le panier */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Boutique</h1>
          <div 
            ref={cartRef}
            className="flex items-center gap-3 bg-white py-2 px-4 rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
              {cartItems}
            </span>
          </div>
        </div>
      </div>

      {/* Grille de produits */}
      <div className="max-w-6xl mx-auto mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className={`bg-white rounded-2xl p-6 shadow-sm transition-all duration-300 
                ${activeProduct === product.id ? 'scale-95' : 'hover:shadow-xl'}`}
            >
              <div className={`${product.color} rounded-xl p-8 mb-6 transition-transform duration-300 hover:scale-105`}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <span className="text-xl font-bold text-blue-600">{product.price}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>

                <button
                  onClick={(e) => addToCart(product, e.currentTarget)}
                  className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300
                    ${activeProduct === product.id 
                      ? 'bg-green-500 text-white transform scale-95'
                      : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30'
                    }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" />
                    {activeProduct === product.id ? 'Ajouté !' : 'Ajouter au panier'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Éléments volants */}
      {flyingItems.map((flyingItem) => (
        <div
          key={flyingItem.id}
          className={`fixed ${flyingItem.product.color} rounded-lg shadow-lg z-50 pointer-events-none
            w-20 h-20 flex items-center justify-center`}
          style={{
            transform: `translate(${flyingItem.start.x}px, ${flyingItem.start.y}px)`,
            animation: 'flyToCart 1s cubic-bezier(0.25, 0.1, 0.25, 1.4)',
            animationFillMode: 'forwards'
          }}
        >
          <img 
            src={flyingItem.product.image}
            alt={flyingItem.product.name}
            className="w-16 h-16 object-contain"
          />
          <style>{`
            @keyframes flyToCart {
              0% {
                transform: translate(${flyingItem.start.x}px, ${flyingItem.start.y}px) rotate(0deg);
                opacity: 1;
              }
              50% {
                transform: translate(${(flyingItem.start.x + flyingItem.end.x) / 2}px, 
                                  ${flyingItem.start.y - 100}px) rotate(180deg);
                opacity: 0.8;
              }
              100% {
                transform: translate(${flyingItem.end.x}px, ${flyingItem.end.y}px) rotate(360deg);
                opacity: 0;
                scale: 0.5;
              }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
};

export default ModernCart;