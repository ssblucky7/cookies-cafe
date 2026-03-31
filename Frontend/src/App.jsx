import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import MenuDetail from './pages/MenuDetail'
import OurStory from './pages/OurStory'
import Community from './pages/Community'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Profile from './pages/Profile'
import OrderTracking from './pages/OrderTracking'
import Wishlist from './pages/Wishlist'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminUsers from './pages/admin/AdminUsers'
import AdminCategories from './pages/admin/AdminCategories'
import AdminReviews from './pages/admin/AdminReviews'
import AdminPosts from './pages/admin/AdminPosts'
import AdminSystem from './pages/admin/AdminSystem'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Home />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/menu" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Menu />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/menu/:slug" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <MenuDetail />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/gallery" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <OurStory />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/community" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Community />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/about" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <AboutUs />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/contact" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Contact />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/login" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Login />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/register" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Register />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/cart" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Cart />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/checkout" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Checkout />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/order-success" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <OrderSuccess />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/profile" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Profile />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/wishlist" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Wishlist />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/orders/:id" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <OrderTracking />
                </main>
                <Footer />
              </div>
            } />

            {/* Admin Routes - Separate Layout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="posts" element={<AdminPosts />} />
              <Route path="system" element={<AdminSystem />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <NotFound />
                </main>
                <Footer />
              </div>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
