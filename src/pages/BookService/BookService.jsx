import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contextProviders/AuthProvider";

const BookService = () => {
  const service = useLoaderData();
  const { title, _id, price, img } = service;

  const { user } = useContext(AuthContext);

  const handleBookService = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;
    const message = form.message.value;

    const order = {
      customerName: name,
      email,
      date,
      service: title,
      service_id: _id,
      img,
      price,
      message,
    };
    // console.log(order);

    fetch("https://car-doctor-server-nu-dun.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("Your service request booked successfully.");
        }
      });
  };

  return (
    <div>
      <div className="card-body w-3/4 mx-auto">
        <h3 className="text-2xl text-error text-center">
          Checkout for: <span className="font-bold">{title}</span>
        </h3>
        <form onSubmit={handleBookService}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                required
                defaultValue={user?.displayName}
                placeholder="Your Full Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                name="date"
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                required
                defaultValue={user?.email}
                placeholder="Your Email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due Amount</span>
              </label>
              <input
                type="text"
                name="phone"
                readOnly
                defaultValue={"$ " + price}
                className="input input-bordered"
              />
            </div>
          </div>
          <textarea
            className="textarea textarea-bordered w-full h-28 mt-12"
            placeholder="Your Message"
            name="message"
            type="text"
          ></textarea>
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Order Confirm"
              className="btn btn-error btn-block text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookService;
