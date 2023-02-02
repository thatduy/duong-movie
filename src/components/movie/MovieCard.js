import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import Button from "../button/Button";
import PropsTypes from "prop-types";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800 ">
      <img
        src={tmdbAPI.image500(poster_path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold ">{title}</h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch Now</Button>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  item: PropsTypes.shape({
    title: PropsTypes.string,
    vote_average: PropsTypes.number,
    release_date: PropsTypes.string,
    poster_path: PropsTypes.string,
    id: PropsTypes.number,
  }),
};
export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <LoadingSkeleton className="w-full h-[250px] object-cover rounded-lg mb-5"></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold ">
          <LoadingSkeleton className="w-full h-[20px]"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>
            <LoadingSkeleton className="w-50px h-[10px]"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton className="w-30 h-[10px]"></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton className="w-full h-[45px] rounded-md"></LoadingSkeleton>
      </div>
    </div>
  );
};
export default MovieCard;
