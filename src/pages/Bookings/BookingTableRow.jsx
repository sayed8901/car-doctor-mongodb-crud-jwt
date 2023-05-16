import Swal from "sweetalert2";

const BookingTableRow = ({ booking, bookings, setBookings }) => {
  const { _id, customerName, email, date, service, service_id, img, price, message, status, } = booking;

  const handleDelete = (id) => {
    // console.log("Want to delete?", id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://car-doctor-server-nu-dun.vercel.app/bookings/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Successfully deleted", data);
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your service request has been removed.",
                "success"
              );

              const remaining = bookings.filter(
                (singleBooking) => singleBooking._id !== id
              );
              setBookings(remaining);
            }
          });
      }
    });
  };

  const handleBookingConfirm = (id) => {
    fetch(`https://car-doctor-server-nu-dun.vercel.app/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "confirm" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          
          // updating state
          const remaining = bookings.filter((booking) => booking._id !== id);
          const updated = bookings.find((booking) => booking._id === id);
          updated.status = "confirm";
          const newBookings = [updated, ...remaining];
          setBookings(newBookings);
        }
      });
  };

  return (
    <tr>
      <th>
        <button
          onClick={() => handleDelete(_id)}
          className="btn btn-circle btn-sm"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-24 h-24">
              <img src={img} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{service}</div>
            <div>
              <span className="text-sm">Service ID:</span>
              <span className="badge badge-ghost badge-sm">{service_id}</span>
            </div>
            <div className="text-sm opacity-50">{message}</div>
          </div>
        </div>
      </td>
      <td>
        {customerName}
        <br />
        <span className="badge badge-ghost badge-sm">{email}</span>
      </td>
      <td>$ {price}</td>
      <td>{date}</td>
      <th>
        {status === "confirm" ? (
          <span className="text-primary font-bold">Already Confirmed</span>
        ) : (
          <button
            onClick={() => {
              handleBookingConfirm(_id);
            }}
            className="btn btn-error btn-sm text-white"
          >
            Please Confirm!
          </button>
        )}
      </th>
    </tr>
  );
};

export default BookingTableRow;
