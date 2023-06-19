import { useState, useEffect } from "react";
import { Box } from '@mui/material'; // Box is a layout component from Material UI that helps override the default CSS styles of the iframe
import CommentBox from "../CommentBox";

const HomepageClips = () => {
  const [homeClipsData, setHomeClipsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const headersList = {
        "Client-Id": "iqzxo4pl07z9emlrlns1my4v6gq206",
        Authorization: "Bearer 6b0u5h2l06qzsy2e57h1guikgrhy5p",
      };
      // api call to get clips from Diablo 4 to display on homepage
      try {
        const response = await fetch(
          "https://api.twitch.tv/helix/clips?game_id=515024",
          {
            method: "GET",
            headers: headersList,
          }
        );
        if (response.ok) {
          const { data } = await response.json();
          setHomeClipsData(data);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, []);
  //formats date to be more readable
  const formatClipDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // return cards with embedded video to be rendered and data to be displayed by mapping over the homeClipsData
  return (
  <section className="container mx-auto mt-10 grid grid-cols-4 gap-4">
    {homeClipsData.map(({ id, url, broadcaster_name, creator_name, created_at }) => (
      <div
        key={id}
      >
        <div className="aspect-w-16 aspect-h-9">
          <Box
            mb={3}
            sx={{
              position: 'relative',
              paddingBottom: '60%',
            }}
          >
            <iframe
              src={`https://clips.twitch.tv/embed?clip=${id}&parent=localhost&parent=https://twitch-clips1-75e676e3bdef.herokuapp.com/`}
              title="Twitch Clip"
              allowFullScreen
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
              }}
            />
          </Box>
        </div>
        <div className="p-3" style={{ marginTop: '-25px', marginBottom: '-15px' }}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {broadcaster_name}
            </h5>
          </a>
          <ul className="mb-2 text-base font-normal text-gray-700 dark:text-white">
            <li>clipped by: {creator_name}</li>
            <li>{formatClipDate(created_at)}</li>
          </ul>
        </div>
        <CommentBox />
      </div>
    ))}
  </section>
  );
};

export default HomepageClips;