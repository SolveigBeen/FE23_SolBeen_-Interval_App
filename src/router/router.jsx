import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Loading from '../pages/Loading';
import SetTimer from '../pages/SetTimer';

import Analog from '../pages/Analog'
import DigitalView from '../pages/DigitalView'
import TextView from '../pages/TextView';
import AlarmView from '../pages/AlarmView';
//import Paus from '../pages/Paus';

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
    path: "/Analog",
    element: <Analog />,
  },

 
  {
    path: "/Digital",
    element: <DigitalView />,
  },

  {
    path: "/Text",
    element: <TextView />,
  },

  {
    path: "/Alarm",
    element: <AlarmView />,
  },
/*
  {
    path: "/Paus",
    element: <Paus />,
  },
 */
]);

export default router