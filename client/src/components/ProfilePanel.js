import Layout from "./Layout";
import { useState } from "react";
import AccountActions from "./AccountSettings";
import UserReviews from "./UserReviews";
import AccountSettings from "./AccountSettings";


function ProfilePanel(props) {
    const [accountActions, setAccountActions] = useState(false)
    const [viewReviews, setViewReviews] = useState(false)
    const [changePasswordForm, setChangePasswordForm] = useState(false)

    const nick = props.loggedIn[1].nick
    const hashedPassword = props.loggedIn[1].password

    function goBack() {
        changePasswordForm ? setChangePasswordForm(false) :
            accountActions ? setAccountActions(false) :
                viewReviews ? setViewReviews(false) : console.log(".")
    }

    return (
        <div className='background-img'>
            <Layout
                showLoginForm={props.showLoginForm}
                setShowLoginForm={props.setShowLoginForm}
                showRegistrationForm={props.showRegistrationForm}
                setShowRegistrationForm={props.setShowRegistrationForm}
                loggedIn={props.loggedIn}
                setLoggedIn={props.setLoggedIn}
                displayedComicLabels={props.displayedComicLabels} 
                comicsInCart={props.comicsInCart}
            />
            <div className="profile_panel">
                {(!accountActions && !viewReviews) && <div id="hello">Hello, {nick}!</div>}
                {(!accountActions && !viewReviews) && <button id="account_settings" onClick={() => setAccountActions(true)}>Account Settings</button>}
                {(!accountActions && !viewReviews) && <button id="view_reviews" onClick={() => setViewReviews(true)}>Your Reviews</button>}
                {accountActions && <AccountSettings changePasswordForm={changePasswordForm} setChangePasswordForm={setChangePasswordForm} goBack={goBack} hashedPassword={hashedPassword} deleteAccount={props.deleteAccount} nick={nick} />}
                {viewReviews && <UserReviews goBack={goBack} nick={nick} />}
            </div>

        </div>)
}
export default ProfilePanel