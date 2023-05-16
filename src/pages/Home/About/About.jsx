import person from "../../../assets/images/about_us/person.jpg";
import parts from "../../../assets/images/about_us/parts.jpg";

const About = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row gap-2">
        <div className="lg:w-1/2 relative">
          <img src={person} className="w-5/6 rounded-lg shadow-2xl" />
          <img
            src={parts}
            className="absolute w-3/6 -bottom-5 right-10 border-8 border-white rounded-lg shadow-2xl"
          />
        </div>
        <div className="lg:w-1/2">
          <h3 className="text-2xl text-error font-bold">About Us</h3>
          <h1 className="text-5xl font-bold pt-3 pb-8">We are qualified & of experience in the field</h1>
          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
          <p className="py-6">the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
          <button className="btn btn-error text-white">Get More Info</button>
        </div>
      </div>
    </div>
  );
};

export default About;
