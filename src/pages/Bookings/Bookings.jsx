import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contextProviders/AuthProvider";
import BookingTableRow from "./BookingTableRow";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const url = `https://car-doctor-server-nu-dun.vercel.app/bookings?email=${user?.email}`;

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('car-doctor-token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if(!data.error){
          setBookings(data)
        }
        else{
          // ideal or standard precess is to log out first then navigate to home page
          navigate('/')
        }
      });
  }, [url, navigate]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-error text-center my-8">You have {bookings.length} bookings.</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th className="text-center">Service info</th>
              <th>Customer info</th>
              <th>Price</th>
              <th>Order Date</th>
              <th className="text-center xl:pr-20">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* data will be shown by mapping */}
            {
                bookings.map(booking => <BookingTableRow
                    key={booking._id}
                    booking={booking}
                    bookings={bookings}
                    setBookings={setBookings}
                ></BookingTableRow>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
