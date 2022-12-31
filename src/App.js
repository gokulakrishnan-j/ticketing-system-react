import './App.css';
import UserDashBoard from './components/UserDashBoard';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Createquery from './components/Createquery';
import DetailsOfQuery from './components/DetailsOfQuery';
import Helpdesk from './components/Helpdesk';
import HelpdeskCheck from './components/HelpdeskCheck';
import AssigneingToManager from './components/AssigneingToManager';
import Management from './components/Management';
import ManagementCheckQuery from './components/ManagementCheckQuery'
import Admin from './components/Admin';
import CreatingNewHelper from './components/CreatingNewHelper';
import CreatingNewManager from './components/CreatingNewManager';
import AdminSignup from './components/AdminSignup';
import Home from './components/Home'
import UserSignup from './components/UserSignup';
import Userchangepassword from './components/Userchangepassword';
import Adminchangepassword from './components/Adminchangepassword'
import AdmineditManagername from './components/AdmineditManagername';
import AdmineditHelpername from './components/AdmineditHelpername';
import Adminforgottenpassword from './components/Adminforgottenpassword';
import Userforgottenpassword from './components/Userforgottenpassword';
import Adminforgottenpasswordchange from './components/Adminforgottenpasswordchange';
import Userforgottenpasswordchange from './components/Userforgottenpasswordchange';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/home' element={ <Home/>}/>
      <Route path='*' element={ <Navigate to ='/home'/>}/>
     <Route path='/student/:name' element={ <UserDashBoard/>}/>
     <Route path='/student/:name/create-query' element={ <Createquery/>}/>
     <Route path='/student/:name/:id' element={ <DetailsOfQuery/>}/>
     <Route path='/helper/:name' element={ <Helpdesk/>}/>
     <Route path='/helper/:name/:id' element={ <HelpdeskCheck/>}/>
     <Route path='/helper/:name/assign/:id/:category' element={ <AssigneingToManager/>}/>
     <Route path='/manager/:name' element={ <Management/>}/>
     <Route path='/manager/:name/:id' element={ <ManagementCheckQuery/>}/>
     <Route path='/admin/:name/:home' element={ <Admin/>}/>
     <Route path='/admin/:name/:home/helper' element={ <CreatingNewHelper/>}/>
     <Route path='/admin/:name/:home/manager' element={ <CreatingNewManager/>}/>
     <Route path='/admin/signup' element={ <AdminSignup/>}/>
     <Route path='/student/signup' element={ <UserSignup/>}/>
     <Route path='/student/changepassword/:name' element={ <Userchangepassword/>}/>
     <Route path='/admin/changepassword/:name' element={ <Adminchangepassword/>}/>
     <Route path='/admin/:name/:home/:managername/changemanagername' element={ <AdmineditManagername/>}/>
     <Route path='/admin/:name/:home/:helpername/changehelpername' element={ <AdmineditHelpername/>}/>
     <Route path='/admin/forgottenpassword' element={ <Adminforgottenpassword/>}/>
     <Route path='/student/forgottenpassword' element={ <Userforgottenpassword/>}/>
     <Route path='/admin/forgottenpassword/:adminname' element={ <Adminforgottenpasswordchange/>}/>
     <Route path='/student/forgottenpassword/:username' element={ <Userforgottenpasswordchange/>}/>
     
     </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
