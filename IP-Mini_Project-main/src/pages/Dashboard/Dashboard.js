import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faCalendarAlt, faPlusCircle, faListAlt } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [type, setType] = useState('Income');
    const [category, setCategory] = useState('Salary');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    
    const isMounted = useRef(true);  // Track component's mount status

    useEffect(() => {
        document.body.classList.add('dashboard-page-body');
        
        return () => {
            document.body.classList.remove('dashboard-page-body');
            isMounted.current = false; // Mark component as unmounted
        };
    }, []);

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const handleAddTransaction = async (e) => {
        e.preventDefault();

        if (!amount || isNaN(amount) || parseFloat(amount) <= 0 || !date) {
            notifyError('Please enter valid details for all fields.');
            return;
        }

        const newTransaction = {
            category,
            amount: parseFloat(amount),
            date: new Date(date),
            type,
        };

        try {
            if (type === 'Income') {
                await axios.post('http://localhost:5000/api/income', newTransaction);
            } else if (type === 'Expense') {
                await axios.post('http://localhost:5000/api/expense', newTransaction);
            }

            // Update transactions only if component is still mounted
            if (isMounted.current) {
                setTransactions([...transactions, newTransaction]);
                setAmount('');
                setDate('');
                notifySuccess('Transaction added successfully!');
            }
        } catch (error) {
            notifyError('Error adding transaction. Please try again.');
        }
    };

    const today = new Date().toISOString().split('T')[0]; // Max date limit

    return (
        <div className="dashboard-page container mt-4">
            <h2 className="track-expense-title text-center mb-4">Track Expense</h2>

            <div className="card-transparent card shadow-sm p-4 mb-4" 
                style={{ background: 'rgba(240, 245, 255, 0.8)', borderRadius: '10px', border: '1px solid #ddd' }}>
                <h4 className="card-title mb-4">Add Transaction</h4>
                <form onSubmit={handleAddTransaction}>
                    <div className="mb-3">
                        <label className="form-label">Type <FontAwesomeIcon icon={faListAlt} /></label>
                        <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category <FontAwesomeIcon icon={faListAlt} /></label>
                        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Salary">Salary</option>
                            <option value="Bills">Bills</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Freelancing">Freelancing</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Amount <FontAwesomeIcon icon={faMoneyBillWave} /></label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date <FontAwesomeIcon icon={faCalendarAlt} /></label>
                        <input
                            type="date"
                            className="form-control"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            max={today}
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-lg">
                            <FontAwesomeIcon icon={faPlusCircle} /> Add Transaction
                        </button>
                    </div>
                </form>
            </div>

            <ToastContainer />

            <div className="row mt-4">
                {transactions.length > 0 ? transactions.map((transaction, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <div 
                            className={`card shadow-sm ${transaction.type === 'Income' ? 'border-success' : 'border-danger'}`} 
                            style={{ background: 'rgba(249, 249, 249, 0.9)', borderRadius: '15px', overflow: 'hidden' }}>
                            <div className="card-body" style={{ borderRadius: '10px' }}>
                                <h5 className="card-title">{transaction.type}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{transaction.category}</h6>
                                <p className="card-text" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    ${transaction.amount.toFixed(2)}
                                </p>
                                <p className="card-text">
                                    <small className="text-muted">{transaction.date.toDateString()}</small>
                                </p>
                            </div>
                        </div>
                    </div>
                )) : null}
            </div>
        </div>
    );
};

export default Dashboard;
