import React from 'react'
import {Routes , Route} from "react-router";
import Homepage from './pages/HomePage';
import CreatePr from './pages/CreatePr';
import UpdatePr from './pages/UpdatePr';
import { Toaster } from 'react-hot-toast';
import "./App.css";
import Footer from './components/Footer';
 const App = () => {
  return (<div>
    <Toaster />
     <Routes>
       <Route path='/' element={<Homepage/>} />
       <Route path='/create' element={<CreatePr />} />
       <Route path='/updatePr/:id' element={<UpdatePr />}/>
     </Routes>
     <Footer />
  </div>)
}

export default App;