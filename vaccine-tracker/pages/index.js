import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalVaccines, setTotalVaccines] = useState(0);

  useEffect(() => {
    // Load data from session storage on mount
    const patients = JSON.parse(sessionStorage.getItem('patients')) || [];
    const vaccines = JSON.parse(sessionStorage.getItem('vaccines')) || [];
    
    setTotalPatients(patients.length);
    setTotalVaccines(vaccines.length);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Vaccine Tracking Dashboard</h1>
      
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-64 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Patients</h2>
          <p className="text-4xl font-bold text-blue-500 mt-2">{totalPatients}</p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 w-64 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Vaccines</h2>
          <p className="text-4xl font-bold text-green-500 mt-2">{totalVaccines}</p>
        </div>
      </div>
      
      <div className="mt-8 flex gap-4">
        <a href="/vaccine" className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600">Add Vaccine</a>
        <a href="/patient" className="bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600">Add Patient</a>
      </div>
    </div>
  );
}
