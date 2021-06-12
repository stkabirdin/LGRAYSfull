import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Logs from './components/logs/Logs';
import AddBtn from './components/layout/AddBtn';
import AddLogModal from './components/logs/AddLogModal';
import EditLogModal from './components/logs/EditLogModal';
import TechListModal from './components/techs/TechListModal';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min';
import './App.css';
import AddTechModal from './components/techs/AddTechModal';
import { Provider } from 'react-redux';
import store from './store';
import RegisterModal from './components/auth/RegisterModal';
import LoginModal from './components/auth/LoginModal';

const App = () => {
  useEffect(() => {
    // Initialize Materialize JS
    M.AutoInit();
  });

  return (
    <Provider store={store}>
      <>
        <Navbar />
        <div className="container">
          <AddBtn />
          <RegisterModal/>
          <LoginModal/>
          <AddLogModal />
          <EditLogModal />
          <AddTechModal />
          <TechListModal />
          <Logs />
        </div>
        <Footer/>
      </>
    </Provider>
  );
};

export default App;
