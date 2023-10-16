import { useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
function AccountSettings({ goBack, hashedPassword, deleteAccount, nick, changePasswordForm, setChangePasswordForm }) {
    const [currentPasswordCorrect, setCurrentPasswordCorrect] = useState("correct")
    const [newPasswordCorrect, setNewPasswordCorrect] = useState("correct")
    const [confirmPasswordCorrect, setConfirmPasswordCorrect] = useState("correct")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    function isPasswordCorrect(password) {
        const manageMessageDisplay = [, , ,]
        const specialSigns = /[!@#$%^&*]/;
        const errMessages = ["be at least 8 characters long", "contain a capital letter", "contain a number", "contain a special symbol"]
        manageMessageDisplay[0] = password.length > 7
        manageMessageDisplay[1] = /[A-Z]/.test(password)
        manageMessageDisplay[2] = /\d/.test(password)
        manageMessageDisplay[3] = password.match(specialSigns)
        let errMessageToDisplay = []
        for (let i = 0; i < errMessages.length; i++) {
            if (!manageMessageDisplay[i]) {
                errMessageToDisplay.push(errMessages[i])
            }
        }
        if (errMessageToDisplay.length > 0) {
            setErrorMessage(`Password must: ${errMessageToDisplay.join(" & ")}`)
            setNewPasswordCorrect("incorrect")
            return true
        }
        else { return false }
    }

    async function handleChangePasswordSubmit(e) {
        e.preventDefault()
        setErrorMessage("")
        setCurrentPasswordCorrect("correct")
        setNewPasswordCorrect("correct")
        setConfirmPasswordCorrect("correct")
        try {
            const response = await axios.put("http://localhost:5000/api/comparePassword", {
                "currentPassword": currentPassword,
                "hashedPassword": hashedPassword
            });
            if (response.data !== "Password correct") {
                setErrorMessage(response.data)
                setCurrentPasswordCorrect("incorrect")
                return;
            }

        } catch (error) {
            console.log(error);
        }
        if (isPasswordCorrect(newPassword)) {
            return;
        }
        else if (newPassword !== confirmNewPassword) {
            setErrorMessage("Passwords doesn't match")
            setNewPasswordCorrect("incorrect")
            setConfirmPasswordCorrect("incorrect")
        }
        else {
            changePassword()
        }
    }

    function changePassword() {
        const response = async () => await axios.put("http://localhost:5000/api/password", {
            newPassword,
            hashedPassword
        })
        response()
            .then(response => {
                setErrorMessage("Password Changed")
                setChangePasswordForm(false)
            }
            )
            .catch(error => console.error(error))
    }

    return (<div>
        <div className="back_arrow" onClick={() => {goBack(); setErrorMessage("")}}>&#8249;</div>
        {!changePasswordForm && <div id="account_settings_title">Account Settings</div>}
        {!changePasswordForm && <button id="change_password" onClick={() => setChangePasswordForm(true)}>Change Password</button>}
        {changePasswordForm && <div id="change_password_title">Change Password</div>}
        {changePasswordForm && <form className="change-password-form" onSubmit={(e) => handleChangePasswordSubmit(e)}>
            <div>
                <label>Current Password</label>
                <input type="password" id="current_password" className={currentPasswordCorrect} onChange={(e) => setCurrentPassword(e.target.value)}></input>
            </div>
            <div>
                <label>New Password</label>
                <input type="password" id="new_password" className={newPasswordCorrect} onChange={(e) => setNewPassword(e.target.value)}></input>
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" id="confirm_password" className={confirmPasswordCorrect} onChange={(e) => setConfirmNewPassword(e.target.value)}></input>
            </div>
            <div id="error_message">{errorMessage}</div>
            <div>
                <input type="submit" id="confirm_password_change" value="Confirm"></input><button id="cancel_password_change" className="cancel" onClick={() => {setChangePasswordForm(false); setErrorMessage("")}}>Cancel</button>
            </div>
        </form>
        }
        {!changePasswordForm && <NavLink to='/'><button id="delete_account" onClick={() => deleteAccount(nick)}>DELETE ACCOUNT</button></NavLink>}
        {!changePasswordForm && <div>{errorMessage}</div>}
    </div>
    )
}
export default AccountSettings
