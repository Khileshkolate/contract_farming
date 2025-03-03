import { useState } from "react";
import { Star } from "lucide-react";

export default function RatingSystem() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-300 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Rate Our Website</h2>
        <p className="text-lg text-gray-600 mb-4">We value your feedback! Tap a star to rate.</p>
        
        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-12 h-12 cursor-pointer transition-all duration-300 transform ${
                (hover || rating) >= star
                  ? "text-yellow-400 scale-110 drop-shadow-lg"
                  : "text-gray-300 hover:text-yellow-400 hover:scale-110"
              }`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <p className={`text-lg font-semibold transition-opacity duration-300 ${
          rating > 0 ? "text-green-700 opacity-100" : "text-gray-400 opacity-75"
        }`}>
          {rating > 0 ? `You rated us ${rating} out of 5! ⭐` : "Click a star to rate"}
        </p>

        {rating > 0 && (
          <button className="mt-4 bg-green-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-green-700 transition-all duration-300">
            Submit Rating
          </button>
        )}
      </div>
    </div>
  );
}
