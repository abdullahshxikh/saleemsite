import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { MeetSaleem } from './pages/MeetSaleem'
import { Priorities } from './pages/Priorities'
import { WardOne } from './pages/WardOne'
import { GetInvolved } from './pages/GetInvolved'
import { Survey } from './pages/Survey'
import { NotFound } from './pages/NotFound'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="meet-saleem" element={<MeetSaleem />} />
          <Route path="priorities" element={<Priorities />} />
          <Route path="ward-1" element={<WardOne />} />
          <Route path="get-involved" element={<GetInvolved />} />
          <Route path="share-your-priorities" element={<Survey />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
