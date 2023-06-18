import { useState, useEffect } from "react";
import { Box } from '@mui/material';

const HomepageClips = () => {
  const [homeClipsData, setHomeClipsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const headersList = {
        "Client-Id": "iqzxo4pl07z9emlrlns1my4v6gq206",
        Authorization: "Bearer 6b0u5h2l06qzsy2e57h1guikgrhy5p",
      };

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

  const formatClipDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
<section className="container mx-auto mt-10 grid grid-cols-4 gap-4">
  {homeClipsData.map(({ id, url, broadcaster_name, creator_name, created_at }) => (
    <div
      key={id}
      className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2 flex flex-col"

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
            src={`https://clips.twitch.tv/embed?clip=${id}&parent=localhost`}
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
          <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {broadcaster_name}
          </h5>
        <ul className="mb-2 text-base font-normal text-gray-700 dark:text-white">
          <li>clipped by: {creator_name}</li>
          <li>{formatClipDate(created_at)}</li>
        </ul>
      </div>
    </div>
  ))}
</section>
  );
};

export default HomepageClips;