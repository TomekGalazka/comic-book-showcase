import React, { useState } from "react";
import axios from "axios";



import Modal from "react-modal";


const Login = (props) => {
    const [nick, setNick] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [modalIsOpen, setIsOpen] = useState(true);

    function closeModal() {
        setIsOpen(false);
    }


    const LogToAccount = async (event) => {
        event.preventDefault();
        setErrorMessage("")
        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                nick,
                password,
            });
            if (response.data[0] === "user found") {
                setNick("");
                setPassword("");
                setEmail("")
                setErrorMessage("")
                props.setShowLoginForm(false);
                props.setLoggedIn([true, response.data[1]])
            } else if (response.data === "user not found") {
                setErrorMessage("Incorrect nick or password")
            } else {
                console.log(response.data)
                setErrorMessage("An error occurred! Please Try again")
            }
        } catch (error) {
            console.log(error);
        }
    };

    const OpenRegistrationForm = async (event) => {
        setNick("");
        setPassword("");
        setErrorMessage("")
        props.setShowLoginForm(false);
        props.setShowRegistrationForm(true);
    }

    function isPasswordCorrect() {
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
            return (true)
        }
        else { return false }
    }

    const createAccount = async (event) => {
        setErrorMessage("")
        event.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMessage("Please enter a valid email address")
            return;
        }
        else if (nick.length < 4) {
            setErrorMessage("Nick must be at least 4 characters long")
            return;
        }
        else if (isPasswordCorrect()) {
            return;
        }
        else {
            try {
                const response = await axios.post("http://localhost:5000/api/register", {
                    email,
                    nick,
                    password
                });
                if (response.data === "user created") {
                    console.log("Created an account!");
                    setEmail("")
                    setNick("");
                    setPassword("");
                    props.setShowRegistrationForm(false);
                    props.setShowLoginForm(true)
                    setErrorMessage("Your account has been succesfully created")
                } else if (response.data === "Nickname already in use") {
                    setErrorMessage("Nickname already in use")
                } else if (response.data === "Email already in use") {
                    setErrorMessage("Email already in use")
                } else {
                    setErrorMessage("An error occurred! Please try again");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const loginFormStyles = {
        content: {
            height: '100px',
            width: '20vw',
            position: 'fixed',
            borderRadius: '25px',
            top: '30%',
            left: '35%'
        }
    };

    return (<Modal
        style={loginFormStyles}
        isOpen={props.showLoginForm || props.showRegistrationForm}
        zIndex={7}
        onRequestClose={closeModal}
        appElement={document.getElementById("root") || undefined}
    >
        <div>


            {props.showLoginForm &&
                <div className="account-sheet">
                    <label className="title_label">Log in to your account</label>
                    <div>Don't have an account? <a className="highlighted_click" onClick={OpenRegistrationForm}> Register </a> instead</div>
                    <form className="login_form" onSubmit={LogToAccount}>
                        <label className="nick_label">Nick:</label>
                        <input className="nick_input" onChange={(e) => setNick(e.target.value)} />
                        <br />
                        <label className="password_label">Password:</label>
                        <input className="password_input" type="password" onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <div className="error-message">{errorMessage}</div>
                        <input type="submit" value="LogIn" className="login_button">
                        </input>
                        <button className="cancel" onClick={(e) => props.setShowLoginForm(false)}>cancel</button>
                    </form>
                </div>
            }
            {props.showRegistrationForm &&
                <div className="account-sheet">
                    <label className="title_label">Create new account</label>
                    <form className="registration_form" onSubmit={createAccount}>
                        <label className="email_label">E-mail</label>
                        <input className="email_input" onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <label className="nick_label">Nick:</label>
                        <input className="nick_input" onChange={(e) => setNick(e.target.value)} />
                        <br />
                        <label className="password_label">Password:</label>
                        <input type="password" className="password_input" onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <div className="error-message">{errorMessage}</div>
                        <div>
                            <input type="submit" value="Register" className="registration_button">
                            </input>
                            <button className="cancel" onClick={(e) => props.setShowRegistrationForm(false)}>cancel </button>
                        </div>
                    </form>
                </div>}
        </div>
    </Modal>)
};

export default Login;
