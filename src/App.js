import './App.css';
import './tailwind.css';
import './style/header.css'

import Header from './components/Header';
import Container from './components/Container';
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './components/ProductPage';
import ProductList from './components/ProductList';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Container /> }>
          <Route path='/product/:productId' element={ <ProductPage /> }/>
          <Route path='/:productCategory' element={ <ProductList /> }/>
        </Route>
        <Route path="*" element={ <Container /> }/>
      </Routes>
    </Router>
      
  );
}

export default App;
