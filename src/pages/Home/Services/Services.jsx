import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
    const [services, setServices] = useState([])

    useEffect( () => {
        fetch('https://car-doctor-server-nu-dun.vercel.app/services')
        .then(res => res.json())
        .then(data => setServices(data))
    } , [])

    console.log(services);

  return (
    <div>
      <div className="text-center mx-auto w-2/3">
        <h3 className="text-2xl text-error font-bold">Services</h3>
        <h1 className="text-5xl font-bold pt-3 pb-8"> Our Service Area </h1>
        <p>the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
            services.map(service => <ServiceCard
                key = {service._id}
                service = {service}
            ></ServiceCard>)
        }
      </div>
    </div>
  );
};

export default Services;
