import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./MusicPage.css";
import { setSong, fetchSongs } from "../../store";
import MusicList from "./MusicList";
import Button from "../Button";
import { BsSearch } from "react-icons/bs";

const MusicPage = ({ bookmarkedPage }) => {
  const dispatch = useDispatch();
  const { songTitle, songsList, isLoading } = useSelector((state) => {
    return {
      songTitle: state.song.songTitle,
      songsList: state.song.songsList,
      isLoading: state.song.isLoading,
    };
  });

  return (
    <div className="music-page-content">
      <div className="form container">
        <h5 className="text-right">
          {!bookmarkedPage ? (
            <Link
              className="text-blue-900 italic font-bold text-2xl"
              to="/music/bookmarked"
            >
              Bookmarked
            </Link>
          ) : (
            <Link
              className="text-blue-900 italic font-bold text-2xl"
              to="/music"
            >
              Back to Search
            </Link>
          )}
        </h5>
        {bookmarkedPage ? (
          <MusicList bookmarked={bookmarkedPage} />
        ) : (
          <>
            <div>
              <h2 className="text-2xl font-bold mb-1">Find a song</h2>
              <div className="flex justify-center">
                <form
                  onSubmit={(event) => event.preventDefault()}
                  className="relative w-3/4"
                >
                  <input
                    type="text"
                    className="h-14 w-full pl-16 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                    placeholder="Song Title (Required)"
                    value={songTitle}
                    onChange={(event) => dispatch(setSong(event.target.value))}
                  />
                  <div className="absolute top-2 left-2">
                    <Button
                      disabled={!songTitle}
                      loading={isLoading}
                      onClick={() => dispatch(fetchSongs(songTitle))}
                      className={`h-10 w-fit text-white rounded-lg ${
                        songTitle
                          ? "bg-blue-900 hover:bg-green-900"
                          : "bg-gray-100 text-slate-300"
                      }  ${isLoading ? "bg-green-900" : ""}`}
                    >
                      <BsSearch size={25} />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <MusicList list={songsList} bookmarked={false} />
          </>
        )}
      </div>
    </div>
  );
};

export default MusicPage;
