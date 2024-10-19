import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Loading from '../pages/Loading';
import SetTimer from '../pages/SetTimer';
import Menu from '../pages/menu';
import Analog from '../pages/Analog'
import DigitalView from '../pages/DigitalView'
import AlarmView from '../pages/AlarmView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Loading />,
  },
  {
    path: "/SetTimer",
    element: <SetTimer />,
  },
  {
    path: "/Menu",
    element: <Menu />,
  },

  {
    path: "/Analog",
    element: <Analog />,
  },
  {
    path: "/Digital",
    element: <DigitalView />,
  },

  {
    path: "/Alarm",
    element: <AlarmView />,
  },
 
]);

export default router