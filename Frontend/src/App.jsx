import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import MenuDetail from './pages/MenuDetail'
import OurStory from './pages/OurStory'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<MenuDetail />} />
            <Route path="/gallery" element={<OurStory />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
