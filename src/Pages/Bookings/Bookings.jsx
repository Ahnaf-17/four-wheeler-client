import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingRow from "./BookingRow";
// import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Bookings = () => {
    const { user } = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
    const axiosSecure = useAxiosSecure()
    // const url = `http://localhost:5000/bookings?email=${user?.email}`
    const url = `/bookings?email=${user?.email}`


    const handleDelete = id => {
        const proceed = confirm('Delete permanently?')
        if (proceed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert("deleted successfully")
                        const remaining = bookings.filter(booking => booking._id !== id)
                        setBookings(remaining)
                    }
                })
        }
    }

    const handleConfirm = id => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: "PATCH",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: 'confirm'})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    // update 
                    const remaining = bookings.filter(booking => booking._id !== id)
                    const updated = bookings.find(booking=> booking._id === id)
                    updated.status ="confirm"
                    const newBookings = [updated,...remaining]
                    setBookings(newBookings)
                }
            })
    }

    useEffect(() => {
        axiosSecure.get(url)
        .then(res => setBookings(res.data))
        // axios.get(url, {withCredentials:true })
        // .then(res =>{
        //     setBookings(res.data)
        // })

        // fetch(url) // credentials: 'include'
        //     .then(res => res.json())
        //     .then(data => setBookings(data))
    }, [axiosSecure, url])
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow key={booking._id} booking={booking} handleDelete={handleDelete}
                                handleConfirm={handleConfirm}
                            ></BookingRow>)
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Bookings;