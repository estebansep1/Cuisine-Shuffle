import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import RestaurantCard from "./RestaruantCard";
import { useNavigate } from "react-router-dom";



function Choose() {
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const zipCodes = [92530, 92595, 92562]; 
  const navigate = useNavigate();
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const fetchRestaurants = async () => {
    setLoading(true);
    const categories = "all";
    const apiCalls = zipCodes.map((location) => {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/yelp?location=${encodeURIComponent(location)}&categories=${encodeURIComponent(categories)}`;
      return fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network error");
          }
          return response.json();
        })
        .then((data) => data.businesses || []);
    });

    try {
      const results = await Promise.all(apiCalls);
      let allRestaurants = results.flat();
      shuffleArray(allRestaurants);
      allRestaurants = allRestaurants.slice(0, 20); 
      setRestaurants(allRestaurants);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const removeFromFront = () => {
    setRestaurants((prevRestaurants) => {
      const newRestaurants = [...prevRestaurants];
      newRestaurants.shift();
      return newRestaurants;
    });
  };

  const removeFromBack = () => {
    setRestaurants((prevRestaurants) => {
      const newRestaurants = [...prevRestaurants];
      newRestaurants.pop();
      return newRestaurants;
    });
  };

  const redirect = (url) => {
    window.open(url, "_blank");
  };

  if (loading || restaurants.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full bg-orange-300 gap-12">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full min-h-screen bg-orange-300 gap-6 p-4 overflow-hidden"> {/* Added overflow-hidden */}
        {restaurants.length > 1 ? (
          <div className="flex flex-col md:flex-row justify-center items-center w-full gap-6 md:gap-24"> {/* Responsive flex direction and gap */}
            <RestaurantCard
              restaurant={restaurants[0]}
              onClick={removeFromBack}
            />

            <h1 className="text-3xl md:text-5xl font-black text-white">OR</h1> {/* Responsive text size */}

            <RestaurantCard
              restaurant={restaurants[restaurants.length - 1]}
              onClick={removeFromFront}
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full gap-6">
            <Confetti />

            <h1 className="text-4xl md:text-6xl font-black text-white animate-bounce"> {/* Responsive text size */}
              Winner!
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center w-full gap-6 md:gap-24"> {/* Responsive flex direction and gap */}
              <RestaurantCard
                restaurant={restaurants[0]}
                onClick={() => {
                  redirect(restaurants[0].url);
                  console.log(restaurants[0].url);
                }}
              />
            </div>
          </div>
        )}
        <button
          className="mt-6 px-8 py-3 bg-white rounded-full shadow-sm transition-shadow duration-300 hover:shadow-xl" // Adjusted padding for the button
          onClick={() => navigate("/")}
        >
          <h1 className="text-lg md:text-2xl font-bold text-orange-400 uppercase"> {/* Responsive text size */}
            Home
          </h1>
        </button>

      </div>
    </>
  );
}

export default Choose;