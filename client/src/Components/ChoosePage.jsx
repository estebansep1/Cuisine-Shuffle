import { useEffect, useState, useCallback, useMemo } from "react";
import Confetti from "react-confetti";
import RestaurantCard from "./RestaruantCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";  

function ChoosePage() {
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  const zipCodes = useMemo(() => [92530, 92595, 92562], []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    const categories = "all";
    const apiCalls = zipCodes.map((location) => {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/yelp?location=${encodeURIComponent(location)}&categories=${encodeURIComponent(categories)}`;
      return axios.get(apiUrl.replace(/([^:]\/)\/+/g, "$1"), { maxRedirects: 0 })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Network error");
          }
          return response.data.businesses || [];
        });
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
  }, [zipCodes]);
  
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

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
      <div className="flex flex-col justify-center items-center w-full h-full bg-orange-300 gap-12 overflow-hidden">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full min-h-screen bg-orange-300 gap-6 p-4 overflow-hidden">
        {restaurants.length > 1 ? (
          <div className="flex flex-col md:flex-row md:justify-center items-center w-full gap-4 md:gap-6 lg:gap-8 md:max-w-2xl lg:max-w-4xl">
            <div className="flex justify-center w-full md:w-1/2 p-2">
              <RestaurantCard
                restaurant={restaurants[0]}
                onClick={removeFromBack}
              />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white">OR</h1>
            <div className="flex justify-center w-full md:w-1/2 p-2">
              <RestaurantCard
                restaurant={restaurants[restaurants.length - 1]}
                onClick={removeFromFront}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full gap-6">
            <Confetti />
            <h1 className="text-4xl md:text-6xl font-black text-white animate-bounce">
              Winner!
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4 md:gap-6 lg:gap-8">
              <div className="flex justify-center w-full md:w-1/2 p-2">
                <RestaurantCard
                  restaurant={restaurants[0]}
                  onClick={() => {
                    redirect(restaurants[0].url);
                    console.log(restaurants[0].url);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <button
          className="mt-6 px-8 py-3 bg-white rounded-full shadow-sm transition-shadow duration-300 hover:shadow-xl"
          onClick={() => navigate("/")}
        >
          <h1 className="text-lg md:text-2xl font-bold text-orange-400 uppercase">
            Home
          </h1>
        </button>
      </div>
    </>
  );
}

export default ChoosePage;
