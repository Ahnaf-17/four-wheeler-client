import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const CheckOut = () => {
    const service = useLoaderData()
    const { title, _id ,price,img } = service
    const {user} = useContext(AuthContext)

    const handleService = e =>{
        e.preventDefault()
        const form = e.target
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email
        const booking ={
            customerName: name,
            email,date,img,
            service:title,
            service_id: _id,
            price: price
        }
        console.log(booking)

        fetch('https://four-wheeler-server.vercel.app/bookings',{
            method: 'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.insertedId){
                alert('booking confirm')
            }
        })

    }


    return (
        <div>
            <h2 className="text-center font-bold">Book your service : {title}</h2>

            <form onSubmit={handleService} className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" defaultValue={user?.displayName}
                    name="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input type="date" 
                    name="date" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" defaultValue={user?.email} 
                    name="email"
                    className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Due amount</span>
                    </label>
                    <input type="" defaultValue={`$`+price} className="input input-bordered" required />
                </div>
                </div>
                <div className="form-control mt-6">

                    <input className="btn bg-orange-600 text-white hover:text-orange-600" type="submit" value="Order Confirm" />
                </div>
            </form>
        </div>

    );
};

export default CheckOut;