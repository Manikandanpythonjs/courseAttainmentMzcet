import Versions from './Components/Versions'
import electronLogo from './assets/electron.svg'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import { BrowserRouter, Route, Routes, Navigate, HashRouter } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import MarkEntry from './Screens/MarkEntry/MarkEntry'
import Cookies from 'js-cookie';
import { useEffect } from 'react'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')


  const cookies = Cookies.get("loggedIn")
  const local = localStorage.getItem("loggedIn")

  useEffect(() => {

    const Check = () => {

      if (local) {
        return <Navigate to="/home" />;

      }
    }
    Check()
  }, [local])


  return (
    <>

      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={local ? <HomeScreen /> : <LoginScreen />}
          />
          <Route
            path="/login"
            element={local ? <HomeScreen /> : <LoginScreen />}
          />
          <Route
            path="/home"
            element={<HomeScreen />}
          />

          <Route
            path="/markentry"
            element={<MarkEntry />}
          />



          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </HashRouter>


    </>
  )
}

export default App

