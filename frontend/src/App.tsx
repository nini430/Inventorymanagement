import {Routes,Route} from 'react-router-dom'

import Navbar from "./components/Navbar";
import InventoryTable from './pages/InventoryTable';
import AddInventory from './pages/AddInventory';

function App() {
  return (
    <div>
     <Navbar/>
      <Routes>
        <Route path='/' element={<InventoryTable/>}/>
        <Route path='/add' element={ <AddInventory/>}/>
      </Routes>
    </div>
  )
}

export default App;
