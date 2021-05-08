import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import Login from './components/Login';
import VerifyOtp from './components/VerifyOtp'
import Home from './components/Home';
import history from './history';

const THEME = createMuiTheme({
  typography: {
    "fontFamily": `"gilroy"`,
    //  "fontSize": 14,
    //  "fontWeightLight": 300,
    //  "fontWeightRegular": 400,
    //  "fontWeightMedium": 500
  }
});

function App() {
  return (
    <div theme={THEME}>
      
        <Router history={history}>
          <Switch >

            <Route exact path='/verify-otp' component={VerifyOtp} />
            <Route exact path='/home' component={Home} />
            <Route path='/' component={Login} />
          </Switch>
        </Router>
     

    </div>
  );
}

export default App;
