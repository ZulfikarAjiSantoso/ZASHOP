
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navcom from './components/Navcom';
import Add from './pages/Add'
import "./App.css"

import Reserpass from './pages/Reserpass';
import Notfound from './pages/Notfound';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Cart from './pages/Cart';
export const App = () => {
    return (
      <div className="App"> 
    
    <BrowserRouter>

            <Switch>
              <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register}/>
                <Route path="/cart" component={Cart}/>

                <Route path="/resetpass" component={Reserpass} />
                <Route path="/add" component={Add} />
                <Route component={Notfound} />
            </Switch>
          </BrowserRouter>
        
          
     
      </div>
    );
  


}

export default App;



