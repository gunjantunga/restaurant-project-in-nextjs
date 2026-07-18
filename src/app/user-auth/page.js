"use client";
import ResturantFooter from "../_components/ResturantFooter";
import CustomerDashboard from "../_components/CustomerDashboard";
import UserSignup from "../_components/UserSignup";
function UserAuth() {

    return (
        <div>
            <CustomerDashboard />
            <div className="container">
                <h2>
                    User
                </h2>
                <UserSignup />
            </div>
            <ResturantFooter />
        </div>
    )
}

export default UserAuth;