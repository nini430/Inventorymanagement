import {Routes,Route} from 'react-router-dom'

import Navbar from "./components/Navbar";
import InventoryTable from './pages/InventoryTable';
import AddInventory from './pages/AddInventory';

function App() {
  return (
    <div>
     <Navbar/>
     <div className='p-4'>
     <Routes>
        <Route path='/' element={<InventoryTable/>}/>
        <Route path='/add' element={ <AddInventory/>}/>
        <Route path='/update/:id' element={<AddInventory/>}/>
      </Routes>
     </div>
      
    </div>
  )
}

export default App;
