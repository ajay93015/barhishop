'use client';

import { useState } from 'react';
import { ShoppingCart, TrendingUp, Package, Search, Plus, Minus, Trash2, BarChart3, X } from 'lucide-react';

export default function InternetWaliDukan() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Product catalog with market data
  const products = [
    { id: 1, name: 'Organic Vegetables Bundle', price: 299, category: 'groceries', image: '🥬', stock: 45, sales: 234, trend: '+12%' },
    { id: 2, name: 'Fresh Fruits Pack', price: 399, category: 'groceries', image: '🍎', stock: 38, sales: 189, trend: '+8%' },
    { id: 3, name: 'Dairy Products Kit', price: 249, category: 'groceries', image: '🥛', stock: 52, sales: 312, trend: '+15%' },
    { id: 4, name: 'Snacks Variety Box', price: 199, category: 'snacks', image: '🍿', stock: 67, sales: 421, trend: '+22%' },
    { id: 5, name: 'Cooking Essentials', price: 449, category: 'groceries', image: '🌾', stock: 29, sales: 156, trend: '+5%' },
    { id: 6, name: 'Beverages Collection', price: 349, category: 'beverages', image: '🥤', stock: 41, sales: 267, trend: '+18%' },
    { id: 7, name: 'Personal Care Bundle', price: 599, category: 'personal-care', image: '🧴', stock: 33, sales: 198, trend: '+10%' },
    { id: 8, name: 'Home Cleaning Set', price: 399, category: 'home', image: '🧹', stock: 44, sales: 223, trend: '+14%' },
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🏪' },
    { id: 'groceries', name: 'Groceries', icon: '🛒' },
    { id: 'snacks', name: 'Snacks', icon: '🍪' },
    { id: 'beverages', name: 'Beverages', icon: '☕' },
    { id: 'personal-care', name: 'Personal Care', icon: '💆' },
    { id: 'home', name: 'Home', icon: '🏠' },
  ];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Cart functions
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Market Analytics
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sales), 0);
  const avgTrend = products.reduce((sum, p) => sum + parseFloat(p.trend), 0) / products.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-orange-500 rounded-full flex items-center justify-center text-3xl">
                🏪
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Internet Wali Dukan</h1>
                <p className="text-sm text-gray-600">Barhi Katni, MP - Fresh & Fast Delivery</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                <BarChart3 size={20} />
                <span className="hidden sm:inline">Analytics</span>
              </button>
              
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                <ShoppingCart size={20} />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Market Analytics Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Market Analytics Dashboard</h2>
                <button onClick={() => setShowAnalytics(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Sales</p>
                      <p className="text-3xl font-bold">{totalSales}</p>
                    </div>
                    <Package size={40} className="text-blue-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Revenue</p>
                      <p className="text-3xl font-bold">₹{(totalRevenue / 1000).toFixed(1)}K</p>
                    </div>
                    <TrendingUp size={40} className="text-green-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Avg Growth</p>
                      <p className="text-3xl font-bold">+{avgTrend.toFixed(1)}%</p>
                    </div>
                    <BarChart3 size={40} className="text-orange-200" />
                  </div>
                </div>
              </div>

              {/* Product Performance Table */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-4">Product Performance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-2">Product</th>
                        <th className="text-right py-3 px-2">Price</th>
                        <th className="text-right py-3 px-2">Stock</th>
                        <th className="text-right py-3 px-2">Sales</th>
                        <th className="text-right py-3 px-2">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-3 px-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{product.image}</span>
                              <span className="text-sm">{product.name}</span>
                            </div>
                          </td>
                          <td className="text-right py-3 px-2">₹{product.price}</td>
                          <td className="text-right py-3 px-2">{product.stock}</td>
                          <td className="text-right py-3 px-2 font-semibold">{product.sales}</td>
                          <td className="text-right py-3 px-2">
                            <span className="text-green-600 font-semibold">{product.trend}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
                <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                        <span className="text-4xl">{item.image}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-orange-600 font-bold">₹{item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 pt-4 space-y-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-orange-600">₹{cartTotal}</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-green-500 to-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition">
                      Proceed to Payment Gateway
                    </button>
                    <p className="text-xs text-center text-gray-500">Payment integration coming soon!</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex overflow-x-auto space-x-3 mb-8 pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-green-500 to-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="font-medium">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-green-100 to-orange-100 p-8 flex items-center justify-center">
                <span className="text-7xl">{product.image}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                    {product.trend}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>Stock: {product.stock}</span>
                  <span>Sold: {product.sales}</span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-green-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">Internet Wali Dukan</p>
          <p className="text-gray-400">Bringing quality products to Barhi Katni, MP</p>
          <p className="text-gray-500 text-sm mt-4">© 2024 All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}