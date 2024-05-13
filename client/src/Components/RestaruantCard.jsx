import React from "react";

const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <div
      className="flex flex-col justify-start items-start w-96 bg-white rounded-2xl gap-5 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12"
      onClick={onClick}
    >
      <img
        src={restaurant.image_url}
        className="w-full h-48 object-cover rounded-t-2xl"
        alt={`${restaurant.name}_logo`}
      />
      <div className="flex flex-col justify-items-start w-full p-4">
        <div className="flex justify-between items-center w-full mb-2">
          <h1 className="text-2xl font-bold text-orange-500">
            {restaurant.name} 🍽️
          </h1>
          <h1 className="text-xl font-bold text-orange-400">
            {restaurant.price}
          </h1>
        </div>
        <h1 className="text-lg font-medium text-orange-400 mb-2">
          ⭐ {restaurant.rating}
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {restaurant.categories.map((category, i) => (
            <React.Fragment key={i}>
              <h1 className="text-md font-medium text-orange-400">
                {category.title}
              </h1>
              {i !== restaurant.categories.length - 1 ? <h1>🥂</h1> : null}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-auto">
          <h1 className="text-right font-thin text-orange-500 break-words">
            {restaurant.location.address1}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
