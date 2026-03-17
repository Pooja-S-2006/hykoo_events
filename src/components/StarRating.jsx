import { Star } from 'lucide-react';

const StarRating = ({ rating, onRatingChange, readonly = false, size = 24 }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onRatingChange?.(star)}
          className={`transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
        >
          <Star
            size={size}
            className={`transition-colors ${
              star <= rating
                ? 'fill-gold text-gold'
                : 'fill-transparent text-border'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
