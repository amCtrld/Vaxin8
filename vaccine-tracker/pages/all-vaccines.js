import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AllVaccines() {
  const [vaccines, setVaccines] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedVaccines = JSON.parse(sessionStorage.getItem('vaccines')) || [];
    setVaccines(storedVaccines);
  }, []);

  return (
    <div
      className="min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: `url('../images/vax.jpg')` }} // Ensure vax.jpg is placed in the public folder
    >
      <h1 className="text-3xl font-bold text-center mb-6 text-white">
        All Vaccines
      </h1>

      {vaccines.length > 0 ? (
        <div className="overflow-auto mx-auto w-4/5 bg-opacity-80 bg-gray-900 rounded-lg shadow-lg">
          <table className="min-w-full bg-transparent rounded-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">Vaccine Name</th>
                <th className="py-2 px-4">Doses</th>
                <th className="py-2 px-4">Manufacturer</th>
                <th className="py-2 px-4">Expiry Date</th> {/* Add expiry date column */}
              </tr>
            </thead>
            <tbody>
              {vaccines.map((vaccine, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'
                  } text-gray-900 border-b`}
                >
                  <td className="py-2 px-4 text-center">{vaccine.name}</td>
                  <td className="py-2 px-4 text-center">{vaccine.doses}</td>
                  <td className="py-2 px-4 text-center">{vaccine.manufacturer}</td>
                  <td className="py-2 px-4 text-center">{vaccine.expiryDate || 'N/A'}</td> {/* Display expiry date */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-white mt-4">
          No vaccines added yet.
        </p>
      )}

      <button
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mx-auto block"
        onClick={() => router.push('/dashboard')}
      >
        Return to Dashboard
      </button>
    </div>
  );
}
