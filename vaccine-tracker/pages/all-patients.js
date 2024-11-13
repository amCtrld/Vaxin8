import { useEffect, useState } from 'react';

export default function AllPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const storedPatients = JSON.parse(sessionStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">All Patients</h1>
      
      {patients.length > 0 ? (
        <table className="min-w-full bg-white rounded-md shadow-md overflow-hidden mx-auto">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Age</th>
              <th className="py-2 px-4">Sex</th>
              <th className="py-2 px-4">Weight</th>
              <th className="py-2 px-4">Blood Group</th>
              <th className="py-2 px-4">Medical Info</th>
              <th className="py-2 px-4">Allergies</th>
              <th className="py-2 px-4">Vaccine</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 text-center">{patient.patientName}</td>
                <td className="py-2 px-4 text-center">{patient.age}</td>
                <td className="py-2 px-4 text-center">{patient.sex}</td>
                <td className="py-2 px-4 text-center">{patient.weight}</td>
                <td className="py-2 px-4 text-center">{patient.bloodGroup}</td>
                <td className="py-2 px-4 text-center">{patient.medicalInfo}</td>
                <td className="py-2 px-4 text-center">{patient.allergies}</td>
                <td className="py-2 px-4 text-center">{patient.selectedVaccine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-700 mt-4">No patients added yet.</p>
      )}
    </div>
  );
}
