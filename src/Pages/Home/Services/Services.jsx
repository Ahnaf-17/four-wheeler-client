/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {

    const [services,setServices] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => setServices(data))
    },[])

    return (
        <div>
            <div className="text-center mt-5">
            <h3 className="text-2xl font-bold text-orange-500">Our Services</h3>
            <h3 className="text-5xl font-bold">Our Services Area</h3>
            <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
            {
                services.map(services => <ServiceCard key={services._id} service={services}></ServiceCard>)
            }
        </div>
        </div>
    );
};

export default Services;