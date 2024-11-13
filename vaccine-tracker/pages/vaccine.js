import { useState, useEffect } from 'react';

export default function VaccinePage() {
  const [vaccines, setVaccines] = useState([]);
  const [vaccineName, setVaccineName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [doses, setDoses] = useState('');

  useEffect(() => {
    const storedVaccines = JSON.parse(sessionStorage.getItem('vaccines')) || [];
    setVaccines(storedVaccines);
  }, []);

  const handleAddVaccine = () => {
    const newVaccine = { name: vaccineName, manufacturer, doses };
    const updatedVaccines = [...vaccines, newVaccine];
    setVaccines(updatedVaccines);
    sessionStorage.setItem('vaccines', JSON.stringify(updatedVaccines));

    // Clear form
    setVaccineName('');
    setManufacturer('');
    setDoses('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Vaccine</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Vaccine Name</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={vaccineName}
            onChange={(e) => setVaccineName(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Manufacturer</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Doses Required</label>
          <input 
            type="number" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={doses}
            onChange={(e) => setDoses(e.target.value)}
          />
        </div>

        <button 
          onClick={handleAddVaccine} 
          className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600"
        >
          Add Vaccine
        </button>
      </div>

      <div className="max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Vaccine List</h2>
        
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left bg-gray-200 font-semibold text-gray-600">Name</th>
              <th className="px-4 py-2 text-left bg-gray-200 font-semibold text-gray-600">Manufacturer</th>
              <th className="px-4 py-2 text-left bg-gray-200 font-semibold text-gray-600">Doses</th>
            </tr>
          </thead>
          <tbody>
            {vaccines.map((vaccine, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{vaccine.name}</td>
                <td className="px-4 py-2">{vaccine.manufacturer}</td>
                <td className="px-4 py-2">{vaccine.doses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
