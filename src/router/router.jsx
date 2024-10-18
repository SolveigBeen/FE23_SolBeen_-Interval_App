import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Loading from '../pages/Loading';
import SetTimer from '../pages/SetTimer';
import Menu from '../pages/menu';
import Analog from '../pages/Analog'

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
 
]);

export default router