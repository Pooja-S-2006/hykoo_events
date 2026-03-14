import { Link } from 'react-router-dom';

const ServiceCard = ({ title, image, description, link = '/services' }) => {
  return (
    <Link to={link} className="service-card group block">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="image-overlay opacity-60 group-hover:opacity-40" />
        <div className="absolute inset-0 flex items-end p-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/80 text-sm line-clamp-2">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
