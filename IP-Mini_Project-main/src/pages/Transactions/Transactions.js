import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Transactions.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Importing toast styles

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const incomeResponse = await axios.get('http://localhost:5000/api/income');
            const expenseResponse = await axios.get('http://localhost:5000/api/expense');
            const combinedTransactions = [
                ...incomeResponse.data.data.map(item => ({ ...item, type: 'Income' })),
                ...expenseResponse.data.data.map(item => ({ ...item, type: 'Expense' })),
            ];
            setTransactions(combinedTransactions);
        } catch (error) {
            console.error("Error fetching transactions:", error);
            toast.error('Failed to fetch transactions.'); // Show error notification
        }
    };

    const deleteTransaction = async (id, type) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
        if (!confirmDelete) return;
    
        try {
            // Determine the API endpoint based on the transaction type
            const apiUrl = type === 'Income' 
                ? `http://localhost:3000/api/income/delete/${id}` 
                : `http://localhost:3000/api/expense/delete/${id}`;
    
            // Send DELETE request to the correct endpoint
            await axios.delete(apiUrl);
    
            // Update the transactions state to remove the deleted transaction
            setTransactions(transactions.filter(transaction => transaction._id !== id));
            
            // Show success notification
            toast.success('Transaction deleted successfully!');
        } catch (err) {
            console.error("Error deleting transaction:", err.response ? err.response.data : err.message);
            toast.error(err.response?.data?.message || 'Failed to delete transaction.');
        }
    };
    

    return (
        <div className="container mt-4 mb-4">
            <h2 className="text-center mb-4">Your Transactions</h2>
            <div className="row justify-content-center">
                {transactions.map((transaction) => (
                    <div key={transaction._id} className="col-12 col-md-6 mb-3">
                        <div className={`card shadow-sm p-3 ${transaction.type === 'Income' ? 'border-success income-card' : 'border-danger expense-card'}`}>
                            <div className="card-body d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="card-title mb-0">{transaction.type}</h5>
                                    <span className="badge bg-primary">{new Date(transaction.date).toLocaleDateString()}</span>
                                    <button
                                        className="btn btn-link text-danger"
                                        onClick={() => deleteTransaction(transaction._id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <span className="card-text">Category: {transaction.category}</span>
                                    <span className="card-text">Amount: ${transaction.amount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer /> {/* Include ToastContainer to render notifications */}
        </div>
    );
};

export default Transactions;
