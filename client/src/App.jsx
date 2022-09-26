import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import Routes from "./routes";
import { useSelector } from "react-redux";
import {instance} from './api/axiosclient';


library.add(fas, far)

const App = () =>{

  const token = useSelector((state) => state.user.token)
  instance.defaults.headers.common['authorization'] = `Bearer ${token}`

  
  return (
    <div>
        <Routes/>
    </div>
  );
};

export default App;