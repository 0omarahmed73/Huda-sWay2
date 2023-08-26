import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { RootLayout } from "./layouts/RootLayout"
import { Root } from "./components/Root"
import { About } from "./components/About"
import { Prayers } from "./components/Prayers"
import { Ayah } from "./components/Ayah"
import { Azkar } from "./components/Azkar"
import { Hadith } from "./components/Hadith"
import { Types } from "./components/Types"
import { ShowAzkar } from "./components/ShowAzkar"
import { RandomZikr } from "./components/RandomZikr"
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
      <Route index element={<Root />} />
      <Route path="about" element={<About />} />
      <Route path="prayers" element={<Prayers />} />
      <Route path="ayah" element={<Ayah />} />
      <Route path="azkar" element={<Azkar />}>
        <Route index element={<Types />} />
        <Route path="random" element={<RandomZikr />} />
        <Route path=":zikr" element={<ShowAzkar />} />
      </Route>
      <Route path="hadith" element={<Hadith />} />
    </Route>
    )
  )
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
