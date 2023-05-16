import { useContext } from "react";
import { AuthContext } from "../../../contextProviders/AuthProvider";

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);

    const handleGoogleLogin = () => {
        googleSignIn()
        .then(result => {
            console.log(result.user);
        })
        .catch(error => {
            console.log(error.message);
        })
    }

  return (
    <div>
      <div className="divider">OR</div>
      <div>
        <button onClick={handleGoogleLogin} className="btn rounded-full btn-outline">Google</button>
      </div>
    </div>
  );
};

export default SocialLogin;
