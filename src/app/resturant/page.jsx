"use client"

import { useState } from "react";
import ResturantLogin from "../_components/ResturantLogin";
import ResturantSignup from "../_components/ResturantSignup";
import ResturantHeader from "../_components/ResturantHeader";
import ResturantFooter from "../_components/ResturantFooter";
import './style.css';
function Resturant() {

    const [login, setLogin] = useState(true);

    return (
        <div className="container">
            <ResturantHeader />
            {login ? <ResturantLogin /> : <ResturantSignup />}
            <div>
                <button className="button-link" onClick={() => setLogin((prev) => !prev)}>
                    {login ? "Do not have account ? SignUp" : "Already have Account? Login"}
                </button>
            </div>
            <ResturantFooter />
        </div>
    )
}
export default Resturant;