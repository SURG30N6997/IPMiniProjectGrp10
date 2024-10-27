import React, { useEffect, useState, useRef } from 'react';
import { Bar, Pie, Line, Doughnut, Radar } from 'react-chartjs-2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
} from 'chart.js';
import './Analytics.css'; // Import your CSS file for custom styles

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
);

const Analytics = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const chartRefs = useRef({}); // Create a ref to hold chart instances

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                const [incomeResponse, expenseResponse] = await Promise.all([
                    fetch('http://localhost:5000/api/income'),
                    fetch('http://localhost:5000/api/expense'),
                ]);
                const incomeData = await incomeResponse.json();
                const expenseData = await expenseResponse.json();

                if (incomeData.success) {
                    setIncomeData(incomeData.data);
                    notifySuccess('Income data fetched successfully!');
                } else {
                    notifyError('Failed to fetch income data.');
                }
                if (expenseData.success) {
                    setExpenseData(expenseData.data);
                    notifySuccess('Expense data fetched successfully!');
                } else {
                    notifyError('Failed to fetch expense data.');
                }
            } catch (error) {
                setError('Failed to fetch data. Please try again later.');
                notifyError('Error fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const prepareChartData = () => {
        const barData = {
            labels: incomeData.map((t) => t.date),
            datasets: [
                {
                    label: 'Income',
                    data: incomeData.map((t) => t.amount),
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                },
                {
                    label: 'Expenses',
                    data: expenseData.map((t) => t.amount),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        };

        const pieData = {
            labels: expenseData.map((t) => t.category),
            datasets: [
                {
                    data: expenseData.map((t) => t.amount),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
            ],
        };

        const lineData = {
            labels: incomeData.map((t) => t.date),
            datasets: [
                {
                    label: 'Income',
                    data: incomeData.map((t) => t.amount),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                },
            ],
        };

        const doughnutData = {
            labels: ['Total Income', 'Total Expenses'],
            datasets: [
                {
                    data: [
                        incomeData.reduce((acc, t) => acc + t.amount, 0),
                        expenseData.reduce((acc, t) => acc + t.amount, 0),
                    ],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                },
            ],
        };

        const radarData = {
            labels: ['Income', 'Expenses', 'Savings'],
            datasets: [
                {
                    label: 'Financial Overview',
                    data: [
                        incomeData.reduce((acc, t) => acc + t.amount, 0),
                        expenseData.reduce((acc, t) => acc + t.amount, 0),
                        incomeData.reduce((acc, t) => acc + t.amount, 0) - expenseData.reduce((acc, t) => acc + t.amount, 0),
                    ],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };

        return { barData, pieData, lineData, doughnutData, radarData };
    };

    const { barData, pieData, lineData, doughnutData, radarData } = prepareChartData();

    if (loading) {
        return <div className="text-center"><h3>Loading...</h3></div>;
    }

    return (
        <div className="analytics-page container mt-5">
            {error && <div className="alert alert-danger">{error}</div>}
            <h2 className="text-center mb-5">Transaction Analytics</h2>
            <div className="row mb-3 text-center">
                <div className="col-6">
                    <span className="badge bg-success">Total Income: ${incomeData.reduce((acc, t) => acc + t.amount, 0)}</span>
                </div>
                <div className="col-6">
                    <span className="badge bg-danger">Total Expenses: ${expenseData.reduce((acc, t) => acc + t.amount, 0)}</span>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card chart-card">
                        <div className="card-header">
                            <i className="bi bi-bar-chart-fill"></i> Income vs. Expenses (Bar)
                        </div>
                        <div className="card-body">
                            <Bar ref={(ref) => chartRefs.current.bar = ref} data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card chart-card">
                        <div className="card-header">
                            <i className="bi bi-pie-chart-fill"></i> Category Breakdown (Pie)
                        </div>
                        <div className="card-body">
                            <Pie ref={(ref) => chartRefs.current.pie = ref} data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card chart-card">
                        <div className="card-header">
                            <i className="bi bi-graph-up-arrow"></i> Income Trend (Line)
                        </div>
                        <div className="card-body">
                            <Line ref={(ref) => chartRefs.current.line = ref} data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card chart-card">
                        <div className="card-header">
                            <i className="bi bi-graph-dots"></i> Income vs. Expenses (Doughnut)
                        </div>
                        <div className="card-body">
                            <Doughnut ref={(ref) => chartRefs.current.doughnut = ref} data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card chart-card">
                        <div className="card-header">
                            <i className="bi bi-bar-chart"></i> Financial Overview (Radar)
                        </div>
                        <div className="card-body">
                            <Radar ref={(ref) => chartRefs.current.radar = ref} data={radarData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Analytics;
