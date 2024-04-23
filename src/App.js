import About from './componant/About';
import Home from './componant/Home';
import Login from './componant/Login';
import Signup from './componant/Signup'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },

    {
      path: "/about",
      element: <About />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    }

  ]);

  return (
    <div>

      <RouterProvider router={router} />
    </div>
  )
}
export default App