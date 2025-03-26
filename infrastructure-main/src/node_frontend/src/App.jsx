import{Routes, Route} from 'react-router-dom';
import DataTable from "./DataTable.jsx";
import "./App.css";
import Header from '../../compenents/Header.jsx';
import cors from 'cors';  
import Home from '../../pages/Home.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
       <Route index element={<Home />} />
      </Route>
    </Routes>     
  );
}
