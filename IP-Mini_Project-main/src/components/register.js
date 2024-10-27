import { getAuth, RecaptchaVerifier, PhoneAuthProvider, signInWithPhoneNumber } from "firebase/auth";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import Modal from 'react-modal'; // Import the modal library

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [countries, setCountries] = useState([]);
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch country codes from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,idd");
        const data = await response.json();
        const countryData = data.map((country) => ({
          name: country.name.common,
          code: country.idd.root + (country.idd.suffixes[0] || "")
        }));
        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching country data:", error);
        toast.error("Failed to load country codes", { position: "bottom-center" });
      }
    };

    fetchCountries();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "bottom-center" });
      return;
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Phone number must be 10 digits!", { position: "bottom-center" });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);

      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        phoneNumber: `${countryCode}${phoneNumber}`,
        photo: ""
      });

      // Send email verification
      await sendEmailVerification(user);
      toast.success("Verification email sent! Please check your inbox.", { position: "top-center" });
      window.location.href = "/login";

      // Set up reCAPTCHA
      // const appVerifier = new RecaptchaVerifier('recaptcha-container', {
      //   'size': 'invisible',
      //   'callback': (response) => {},
      //   'expired-callback': () => {}
      // }, auth);

      // // Send OTP to phone number
      // const verificationResult = await signInWithPhoneNumber(auth, `${countryCode}${phoneNumber}`, appVerifier);
      // setVerificationId(verificationResult.verificationId);
      // setOtpSent(true);
      // toast.success("OTP sent to your phone!", { position: "top-center" });
      // setIsModalOpen(true); // Open the OTP modal

    } catch (error) {
      console.error(error.message);
      // toast.error(error.message, { position: "bottom-center" });
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await auth.signInWithCredential(credential);
      toast.success("Phone number verified successfully!", { position: "top-center" });
      setIsModalOpen(false); // Close the modal on successful verification
    } catch (error) {
      console.error(error.message);
      toast.error("Invalid OTP. Please try again.", { position: "bottom-center" });
    }
  };

  // OTP Modal component
  const OtpModal = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Enter OTP</h2>
      <input 
        type="text" 
        placeholder="Enter your OTP" 
        value={otp} 
        onChange={(e) => setOtp(e.target.value)} 
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );

  // Enhanced inline styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f7f9fc',
    },
    formContainer: {
      maxWidth: '400px',
      width: '100%',
      padding: '30px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      margin: '20px',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333',
    },
    label: {
      marginBottom: '5px',
      display: 'block',
      fontWeight: 'bold',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      transition: 'border-color 0.3s',
      boxSizing: 'border-box',
    },
    inputFocus: {
      borderColor: '#007bff',
    },
    button: {
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    alreadyRegister: {
      textAlign: 'right',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.formContainer}>
        <h3 style={styles.title}>Sign Up</h3>

        <div className="mb-3">
          <label style={styles.label}>First name</label>
          <input
            type="text"
            style={styles.input}
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label style={styles.label}>Last name</label>
          <input
            type="text"
            style={styles.input}
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label style={styles.label}>Email address</label>
          <input
            type="email"
            style={styles.input}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label style={styles.label}>Phone Number</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              style={{
                width: '30%',
                padding: '12px 15px',
                marginBottom: '15px',
                marginRight: '15px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px',
              }}
            >
              {countries.map((country, index) => (
                <option key={index} value={country.code}>
                  ({country.code}) {country.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              style={styles.input}
              placeholder="Enter your phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              maxLength={10} // Restrict input to 10 digits
            />
          </div>
        </div>

        <div className="mb-3">
          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            style={styles.input}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Sign Up
        </button>

        <div style={styles.alreadyRegister}>
          Already registered? <a href="/login">Login here</a>
        </div>

        <div id="recaptcha-container"></div>
      </form>

      {/* <OtpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </div>
  );
}

export default Signup;
