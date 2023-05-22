import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const searchRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // fetch('https://car-doctor-server-nu-dun.vercel.app/services')
    fetch(
      `http://localhost:5000/services?search=${searchText}&sort=${
        isAscending ? "asc" : "desc"
      }`
    )
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [isAscending, searchText]);
  // console.log(services);

  const handleSearch = () => {
    // console.log(searchRef.current.value);
    setSearchText(searchRef.current.value);
  };

  return (
    <div>
      <div className="text-center mx-auto w-2/3">
        <h3 className="text-2xl text-error font-bold">Services</h3>
        <h1 className="text-5xl font-bold pt-3 pb-8"> Our Service Area </h1>
        <p>
          The majority have suffered alteration in some form, by injected
          humour, or randomised words which do not look even slightly
          believable.
        </p>


        <form onChange={handleSearch} className="form-control mt-8">
          <div className="input-group">
            <input
              type="text"
              ref={searchRef}
              placeholder="Search…"
              className="input input-bordered"
            />
            <button
              // onClick={handleSearch}
              className="btn btn-square"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>

        <button
          onClick={() => setIsAscending(!isAscending)}
          className="btn btn-primary my-8"
        >
          {isAscending
            ? "Sorting as per price in Descending Order"
            : "Sorting as per price in Ascending Order"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
