import { useContext } from "react";
import { AuthContext } from "../contextProviders/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    // console.log(user);

    const location = useLocation();
    console.log(location);

    if(loading){ return <progress className="progress w-56"></progress>}

    if(user?.email){return children}
    else{return <Navigate to={'/login'} state={{from: location}} replace={true}></Navigate>}
};

export default PrivateRoute;