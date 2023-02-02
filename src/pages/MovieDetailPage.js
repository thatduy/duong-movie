import React from "react";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";

const MovieDetailPage = () => {
  const { Id } = useParams();

  const { data } = useSWR(tmdbAPI.getMovieDetails(Id), fetcher);

  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover "
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
          className="object-cover w-full h-full rounded-lg "
        />
      </div>
      <h1 className="mb-10 text-4xl font-bold text-center text-white">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center mb-10 gap-x-5">
          {genres.map((item) => (
            <span
              className="px-4 py-2 border rounded border-primary text-primary"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10 ">
        {overview}
      </p>
      <div>
        <MovieMeta type="credits"></MovieMeta>
        <MovieMeta type="videos"></MovieMeta>
        <MovieMeta type="similar"></MovieMeta>
      </div>
    </div>
  );
};
function MovieMeta({ type = "videos" }) {
  const { Id } = useParams();

  const { data } = useSWR(tmdbAPI.getMovieTotalType(Id, type), fetcher);
  if (!data) return null;

  if (type === "credits") {
    const { cast } = data;
    console.log("🚀 ~ file: MovieDetailPage.js:68 ~ MovieMeta ~ cast", cast);

    if (!cast || cast.length <= 0) return null;
    return (
      <div className="py-10">
        <h2 className="mb-10 text-3xl text-center">Casts</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item " key={item.id}>
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                alt=""
                className="w-full h-[350px] object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-medium text-center">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos")
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.slice(0, 2).map((item) => (
              <div className="" key={item.id}>
                <h3 className="inline-block p-3 mb-5 font-medium tet-xl bg-secondary">
                  {item.name}
                </h3>
                <div className="w-full aspect-video">
                  <iframe
                    width="891"
                    height="501"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="Nhạc Chill TikTok Nhẹ Nhàng 2023 - Những Ca Khúc Lofi Chill Buồn Thịnh Hành Hay Nhất P87"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="object-fill w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    if (type === "similar")
      return (
        <div className="py-10">
          <h3 className="text-3xl font-medium">Similar Movie</h3>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
  }
  return null;
}
// function MovieCredits() {
//   const { Id } = useParams();

//   const { data } = useSWR(tmdbAPI.getMovieTotalType(Id, "credits"), fetcher);
//   if (!data) return null;
//   const { cast } = data;
//   if (!cast || cast.length <= 0) return null;
//   return (
//     <div className="py-10">
//       <h2 className="mb-10 text-3xl text-center">Casts</h2>
//       <div className="grid grid-cols-4 gap-5">
//         {cast.slice(0, 4).map((item) => (
//           <div className="cast-item " key={item.id}>
//             <img
//               src={tmdbAPI.imageOriginal(item.profile_path)}
//               alt=""
//               className="w-full h-[350px] object-cover rounded-lg mb-3"
//             />
//             <h3 className="text-xl font-medium text-center">{item.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// function MovieVideos() {
//   const { Id } = useParams();

//   const { data } = useSWR(tmdbAPI.getMovieTotalType(Id, "videos"), fetcher);
//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;
//   return (
//     <div className="py-10">
//       <div className="flex flex-col gap-10">
//         {results.slice(0, 2).map((item) => (
//           <div className="" key={item.id}>
//             <h3 className="inline-block p-3 mb-5 font-medium tet-xl bg-secondary">
//               {item.name}
//             </h3>
//             <div className="w-full aspect-video">
//               <iframe
//                 width="891"
//                 height="501"
//                 src={`https://www.youtube.com/embed/${item.key}`}
//                 title="Nhạc Chill TikTok Nhẹ Nhàng 2023 - Những Ca Khúc Lofi Chill Buồn Thịnh Hành Hay Nhất P87"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 allowFullScreen
//                 className="object-fill w-full h-full"
//               ></iframe>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// function MovieSimilar() {
//   const { Id } = useParams();

//   const { data } = useSWR(
//     tmdbAPI.getMovieTotalType(Id, "similar"),

//     fetcher
//   );

//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;
//   return (
//     <div className="py-10">
//       <h3 className="text-3xl font-medium">Similar Movie</h3>
//       <div className="movie-list">
//         <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
//           {results.length > 0 &&
//             results.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <MovieCard item={item}></MovieCard>
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }
export default MovieDetailPage;
