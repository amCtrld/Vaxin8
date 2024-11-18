import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';

export default function Dashboard() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalVaccines, setTotalVaccines] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const patients = JSON.parse(sessionStorage.getItem('patients')) || [];
    const vaccines = JSON.parse(sessionStorage.getItem('vaccines')) || [];
    setTotalPatients(patients.length);
    setTotalVaccines(vaccines.length);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar role="Medical Staff" />
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-2xl font-bold mb-6">Medical Staff Dashboard</h1>
        <div className="grid grid-cols-2 gap-6 w-full max-w-xl mb-10">
          {/* Total Patients */}
          <div className="p-6 bg-white rounded shadow-md text-center">
            <h2 className="text-lg font-bold">Total Patients</h2>
            <p className="text-2xl">{totalPatients}</p>
          </div>

          {/* Total Vaccines */}
          <div className="p-6 bg-white rounded shadow-md text-center">
            <h2 className="text-lg font-bold">Total Vaccines</h2>
            <p className="text-2xl">{totalVaccines}</p>
          </div>
        </div>

        {/* Add Vaccine and Add Patient Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/vaccine')}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Add Vaccine
          </button>
          <button
            onClick={() => router.push('/patient')}
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            Add Patient
          </button>
        </div>
      </div>
    </div>
  );
}
