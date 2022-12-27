import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PlayIcon from "../public/assets/icons/play-icon.svg";
import StopIcon from "../public/assets/icons/stop-icon.svg";
import PauseIcon from "../public/assets/icons/pause-icon.svg";
import SoundOnIcon from "../public/assets/icons/sound-icon.svg";
import SoundPlusIcon from "../public/assets/icons/sound-plus-icon.svg";
import SoundMinusIcon from "../public/assets/icons/sound-minus-icon.svg";
import SoundOffIcon from "../public/assets/icons/sound-off-icon.svg";
import FullScreenIcon from "../public/assets/icons/full-screen-icon.svg";
import styles from "../styles/Home.module.css";
import { currentVideo, requestVideos } from "../utils/requests";

export default function Home() {
  const [search, setSearch] = useState("Animais");
  const [openSearch, setOpenSearch] = useState(false);
  const [video, setVideo] = useState({
    link: "",
    duration: "00:00",
  });
  const [openVolume, setOpenVolume] = useState(false);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [pastTimeNumber, setPastTimeNumber] = useState("00:00");
  const input = useRef("");
  const videoRef = useRef("");
  const timeline = useRef("");
  const pastTime = useRef("");
  const ball = useRef("");

  useEffect(() => {
    searchingVideos(search);
  }, []);

  useEffect(() => {
    formatattingDuration();
  }, [videoRef]);

  async function searchingVideos(query) {
    try {
      const response = await requestVideos(query, 10);
      setVideos(response.items);

      return gettingLink(response.items[0].id.videoId);
    } catch (error) {
      setError(error);
    }
  }

  async function gettingLink(id) {
    try {
      const data = await currentVideo(id, 10);

      return formatattingDuration(data.lengthSeconds, data.formats[2].url);
    } catch (error) {
      setError(error);
    }
  }

  function formatattingDuration(durationInSeconds, link) {
    let newTimer = Math.floor(durationInSeconds);
    newTimer = Math.floor(newTimer / 60) + ":" + (newTimer % 60);
    videoRef.current.currentTime = 0;
    pastTime.current.style.width = 0;
    setVideo({ link, duration: newTimer });
  }

  function handlePlayer(event) {
    if (event.target.id === "fullscreen") {
      return videoRef.current.requestFullscreen();
    } else if (event.target.id === "play") {
      return videoRef.current.play();
    } else if (event.target.id === "pause") {
      return videoRef.current.pause();
    } else if (event.target.id === "stop") {
      videoRef.current.pause();
      return (videoRef.current.currentTime = 0);
    } else if (event.target.id === "sound-off") {
      return (videoRef.current.volume = 0);
    } else if (event.target.id === "sound-on") {
      return setOpenVolume(!openVolume);
    } else if (event.target.id === "plus-volume") {
      if (videoRef.current.volume >= 0.9) {
        return (videoRef.current.volume = 1);
      }

      const currentVolume = Math.floor(ball.current.style.top.slice(0, 2));
      ball.current.style.top = currentVolume - 15 + "%";
      return (videoRef.current.volume += 0.15);
    } else if (event.target.id === "minus-volume") {
      if (videoRef.current.volume < 0.1) {
        return (videoRef.current.volume = 0);
      }

      const currentVolume = Math.floor(ball.current.style.top.slice(0, 2));
      ball.current.style.top = currentVolume + 15 + "%";
      return (videoRef.current.volume -= 0.15);
    }
  }

  function handleTimeline() {
    let newTimer = Math.floor(videoRef.current.currentTime);
    newTimer =
      Math.floor(newTimer / 60)
        .toString()
        .padStart(2, "0") +
      ":" +
      (newTimer % 60).toString().padStart(2, "0");
    setPastTimeNumber(newTimer);

    let newWidth = (
      (videoRef.current.currentTime * 100) /
      videoRef.current.duration
    ).toFixed(2);
    pastTime.current.style.width = newWidth + "%";
  }

  function handleChangeTime(event) {
    const fullWidth = timeline.current.getBoundingClientRect().width;
    const newWidth =
      ((event.clientX - timeline.current.getBoundingClientRect().x) * 100) /
      fullWidth;
    pastTime.current.style.width = newWidth + "%";

    const newTimer = (videoRef.current.duration * newWidth) / 100;
    videoRef.current.currentTime = newTimer;
  }

  function handleSearchButton() {
    if (!openSearch) {
      return setOpenSearch(true);
    }

    searchingVideos(input.current.value);
    setSearch(input.current.value);
    return (input.current.value = "");
  }
  return (
    <>
      <Head>
        <title>Player</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main className={styles.main}>
        <div>
          <video
            onTimeUpdate={() => handleTimeline()}
            src={video.link}
            className={styles.video}
            ref={videoRef}
          />
          <div
            className={styles.timelineContainer}
            onMouseDown={(event) => handleChangeTime(event)}
          >
            <div className={styles.timeline} ref={timeline}>
              <div className={styles.pastTimeline} ref={pastTime} />
            </div>
          </div>
          <div>
            <div className={styles.icons}>
              <Image
                id='sound-on'
                src={SoundOnIcon.src}
                width='30'
                height='30'
                className={styles.icon}
                onClick={(event) => handlePlayer(event)}
              />
              <Image
                id='sound-off'
                src={SoundOffIcon.src}
                width='30'
                height='30'
                className={styles.icon}
                onClick={(event) => handlePlayer(event)}
              />
              <Image
                id='stop'
                src={StopIcon}
                className={styles.icon}
                onClick={(event) => handlePlayer(event)}
              />
              <Image
                id='play'
                src={PlayIcon}
                className={styles.icon}
                onClick={(event) => handlePlayer(event)}
              />
              <Image
                id='pause'
                src={PauseIcon.src}
                width='30'
                height='30'
                className={styles.icon}
                onClick={(event) => handlePlayer(event)}
              />
              <Image
                id='fullscreen'
                src={FullScreenIcon}
                className={styles.icon}
                onClick={(event) => handlePlayer(event)}
              />
            </div>
            <h3 className={styles.time}>
              {pastTimeNumber}/{video.duration}
            </h3>
          </div>
          {openVolume && (
            <div>
              <div className={styles.volume}>
                <div className={styles.volumeBar}>
                  <div className={styles.ball} ref={ball} />
                </div>
              </div>
              <img
                id='minus-volume'
                src={SoundMinusIcon.src}
                className={styles.iconVolume}
                onClick={(event) => handlePlayer(event)}
              />
              <img
                id='plus-volume'
                src={SoundPlusIcon.src}
                className={styles.iconVolume}
                onClick={(event) => handlePlayer(event)}
              />
            </div>
          )}
        </div>
        <div className={styles.playlist}>
          <div className={styles.buttonsArea}>
            {openSearch ? (
              <div>
                <button
                  className={styles.button}
                  onClick={() => {
                    setOpenSearch(false);
                  }}
                >
                  X
                </button>
                <input type='text' ref={input} className={styles.input} />
              </div>
            ) : (
              <div>
                <button className={styles.buttonActive}>{search}</button>
                {"Animais" !== search && (
                  <button
                    className={styles.button}
                    onClick={() => {
                      setSearch("Animais");
                      return searchingVideos();
                    }}
                  >
                    Animais
                  </button>
                )}
                {"Cachorros" != search && (
                  <button
                    className={styles.button}
                    onClick={() => {
                      setSearch("Cachorros");
                      return searchingVideos("Cachorros");
                    }}
                  >
                    Cachorros
                  </button>
                )}
                {"Gatos" != search && (
                  <button
                    className={styles.button}
                    onClick={() => {
                      setSearch("Gatos");
                      return searchingVideos("Gatos");
                    }}
                  >
                    Gatos
                  </button>
                )}
              </div>
            )}
            <button
              className={styles.button}
              onClick={() => handleSearchButton()}
            >
              Pesquisar
            </button>
          </div>
          {videos.map((item) => (
            <div
              className={styles.playlistVideo}
              onClick={() => gettingLink(item.id.videoId)}
              key={item.id}
            >
              <img src={item.snippet.thumbnails.medium.url} />
              <div className={styles.description}>
                <h3>{item.snippet.title}</h3>
                <p>{item.snippet.channelTitle}</p>
                <p>
                  {new Date(item.snippet.publishTime).toLocaleString("pt-BR", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
        {error && (
          <div className='error'>
            <p>{error}</p>
          </div>
        )}
        <style jsx>{`
          #plus-volume {
            left: 32%;
          }
          #minus-volume {
            left: 27%;
          }

          @media only screen and (max-width: 320px) {
            #plus-volume {
              left: 12%;
            }

            #minus-volume {
              left: 3%;
            }
          }
        `}</style>
      </main>
    </>
  );
}
