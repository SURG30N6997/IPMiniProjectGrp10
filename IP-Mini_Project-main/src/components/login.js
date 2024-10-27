import { signInWithEmailAndPassword  } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase.js";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // console.log("User logged in Successfully");
       // Check if the user's email is verified
      if (user.emailVerified) {
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      
      window.location.href = "/dashboard";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      } else {
        toast.error("Please verify your email before logging in.", {
          position: "top-center",
        });
        auth.signOut(); // Sign out the user if they haven't verified their email
      }
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };


  // Enhanced inline styles
   // All styles in a single object
   const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height
      backgroundColor: '#f7f9fc', // Light background color
    },
    formContainer: {
      maxWidth: '400px',
      width: '100%',
      padding: '30px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff', // White background for the form
      margin: '20px', // Added margin for space above and below
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333', // Darker text color
    },
    label: {
      marginBottom: '5px',
      display: 'block',
      fontWeight: 'bold', // Bold labels
      color: '#555', // Slightly lighter text color
    },
    input: {
      width: '100%',
      padding: '12px 15px', // More padding for better appearance
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      transition: 'border-color 0.3s', // Smooth transition for focus
      boxSizing: 'border-box', // Ensures padding is included in total width
    },
    inputFocus: {
      borderColor: '#007bff', // Change border color on focus
    },
    button: {
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s', // Smooth transition for hover
    },
    buttonHover: {
      backgroundColor: '#0056b3', // Darker blue on hover
    },
    forgotPassword: {
      color: '#007bff', // Link color
      textDecoration: 'none',
    },
    googleSignIn: {
      textAlign: 'center', // Center the Google sign-in button
      margin: '20px 0px', // Add some margin around it
    },
  };


  return (
    <div style={styles.container}> 
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <h3 style={styles.title}>Login</h3>

        <div className="mb-3">
          <label style={styles.label}>Email address</label>
          <input
            type="email"
            style={styles.input}
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)} // Change border color on focus
            onBlur={(e) => (e.target.style.borderColor = '')}
          />
        </div>

        <div className="mb-3">
          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)} // Change border color on focus
            onBlur={(e) => (e.target.style.borderColor = '')} 
          />
        </div>

        <div className="d-grid">
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </div>
        <p className="forgot-password text-right" style={{textAlign: 'right',marginTop: '10px',}} >
          New user <a href="/signup" style={styles.forgotPassword}>Register Here</a>
        </p>
        <div style={styles.googleSignIn}>
          <SignInwithGoogle />
        </div>
      </form>
    </div>
  );
}

export default Login;