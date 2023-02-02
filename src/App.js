import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Banner from "./components/banner/Banner";

import Main from "./components/layout/Main";
// import HomePage from "./pages/HomePage";
// import MovieDetailPage from "./pages/MovieDetailPage";
// import MoviePage from "./pages/MoviePage";

const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
// const MoviePageV2 = lazy(() => import("./pages/MoviePageV2"));
function App() {
  return (
    <Routes>
    <Route path="/movies"
              element={<HomePage></HomePage>}
            ></Route>
            </Routes>
  );
}

export default App;
