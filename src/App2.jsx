
import {RouterProvider} from 'react-router-dom';
import router from "./router/router";
import './App.css';
import { TimerProvider } from './services/timer';


function App() {
  return (
    <>
<TimerProvider>
  
      <RouterProvider router={router} />
    </TimerProvider>
  </>
  )
}