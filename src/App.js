import './App.css'
import Default from "./pages/default";
import {BrowserRouter as  Router, Routes,Route, NavLink } from "react-router-dom";
import UserKab from "./pages/user_kab";
import Uslugi from "./pages/uslugi";
import UslugItemPages from "./pages/uslug_item_pages";
import InfoComp from "./pages/info_comp";
import Error from "./pages/error";
import { useEffect, useState } from 'react';







function App() {

  const [isAuth,setIsAuth] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsAuth(true);
    };
  },[]);


  return (
    <>
    <Router>
      <Routes>
          <Route exact path="/" element={<Default/>}/>
          <Route exact path='/uslugi' element={<Uslugi/>}/>
          <Route exact path="/uslugi/item/:id" element={<UslugItemPages/>}/>
          <Route exact path="/info/comp" element={<InfoComp/>}/>
          <Route exact path="*" element={<Error/>}/>
          {isAuth?
          <>  
            <Route exact path="/user" element={<UserKab/>} />
          </>
          :<></>}
        </Routes>
      </Router>
    </>
  );

}

export default App;
