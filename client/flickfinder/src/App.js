import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MovieSelect from './pages/moviesselect';
import FindMatches from './pages/FindMatches';
import searchFor from './pages/searchFor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/moviesselect" element={<MovieSelect />} />
        <Route path="/findmatches" element={<FindMatches />} />
        <Route path="/searchfor" element={<searchFor />} />
        
      </Routes>
    </Router>
  );
}

export default App;
