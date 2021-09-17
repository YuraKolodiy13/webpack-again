import Homepage from "@/pages/Homepage/Homepage";
import Posts from "@/pages/Posts/Posts";
import {Switch, Route, NavLink} from 'react-router-dom';

const App = () => {

  return (
    <div className='app'>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/posts'>Posts</NavLink>
        </li>
      </ul>
      <Switch>
        <Route path="/" component={Homepage} exact />
        <Route path="/posts" component={Posts} />
      </Switch>
    </div>
  )
};

export default App;