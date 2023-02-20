import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./MusicPage.css";
import { setSong, fetchSongs } from "../../store";
import MusicList from "./MusicList";

const MusicPage = ({ bookmarkedPage }) => {
  const dispatch = useDispatch();
  const { songTitle, songsList } = useSelector((state) => {
    return {
      songTitle: state.song.songTitle,
      songsList: state.song.songsList,
    };
  });

  return (
    <div className="music-page-content">
      <div className="form container">
        <h5 className="text-right text-blue-600">
          {!bookmarkedPage ? (
            <Link className="link" to="/music/bookmarked">
              Bookmarked
            </Link>
          ) : (
            <Link className="link" to="/music">
              Back to Search
            </Link>
          )}
        </h5>
        {bookmarkedPage ? (
          <MusicList bookmarked={bookmarkedPage} />
        ) : (
          <>
            <div>
              <h2 className="text-2xl font-bold">Find a song</h2>
              <form onSubmit={(event) => event.preventDefault()}>
                <input
                  className="w-1/2 mt-1 rounded-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
                  placeholder="Song Title (Required)"
                  value={songTitle}
                  onChange={(event) => dispatch(setSong(event.target.value))}
                />
                <button
                  disabled={!songTitle}
                  onClick={() => dispatch(fetchSongs(songTitle))}
                  className={`${
                    songTitle
                      ? "bg-blue-300 font-bold"
                      : "bg-gray-100 text-slate-300"
                  } border-solid self-end  ml-1 rounded h-fit w-24 text-sm border-2`}
                >
                  Search
                </button>
              </form>
            </div>
            <MusicList list={songsList} bookmarked={false} />
          </>
        )}
      </div>
    </div>
  );
};

export default MusicPage;
