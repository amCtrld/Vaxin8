import { useEffect, useState } from 'react';

export default function AllVaccines() {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const storedVaccines = JSON.parse(sessionStorage.getItem('vaccines')) || [];
    setVaccines(storedVaccines);
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">All Vaccines</h1>
      
      {vaccines.length > 0 ? (
        <table className="min-w-full bg-white rounded-md shadow-md overflow-hidden mx-auto">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4">Vaccine Name</th>
              <th className="py-2 px-4">Dose</th>
              <th className="py-2 px-4">Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {vaccines.map((vaccine, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 text-center">{vaccine.name}</td>
                <td className="py-2 px-4 text-center">{vaccine.dose}</td>
                <td className="py-2 px-4 text-center">{vaccine.manufacturer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-700 mt-4">No vaccines added yet.</p>
      )}
    </div>
  );
}
