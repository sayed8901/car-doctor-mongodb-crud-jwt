import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ServiceCard = ({service}) => {
    const {_id, img, title, price} = service;

  return (
    <div className="card bg-base-100 shadow-xl border">
      <figure className="px-10 pt-10">
        <img
          src={img}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold">{title}</h2>
        <div className="flex items-center">
            <p className="text-xl text-error font-bold">Price: ${price}</p>
            <div className="card-actions">
                <Link to={`/book/${_id}`}>Book now<button className="btn btn-sm btn-circle btn-outline btn-error"><FaArrowRight/></button></Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
