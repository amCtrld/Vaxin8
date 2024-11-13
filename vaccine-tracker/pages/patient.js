import { useState, useEffect } from 'react';

export default function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  
  // Form state for patient details
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [medicalInfo, setMedicalInfo] = useState('');
  const [allergies, setAllergies] = useState('');
  const [selectedVaccine, setSelectedVaccine] = useState('');

  // Load stored vaccines and patients when the component mounts
  useEffect(() => {
    const storedPatients = JSON.parse(sessionStorage.getItem('patients')) || [];
    const storedVaccines = JSON.parse(sessionStorage.getItem('vaccines')) || [];
    setPatients(storedPatients);
    setVaccines(storedVaccines);
  }, []);

  // Handle adding a new patient
  const handleAddPatient = () => {
    const newPatient = {
      patientName, age, sex, weight, bloodGroup, medicalInfo, allergies, selectedVaccine
    };
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    sessionStorage.setItem('patients', JSON.stringify(updatedPatients));

    // Clear form fields
    setPatientName('');
    setAge('');
    setSex('');
    setWeight('');
    setBloodGroup('');
    setMedicalInfo('');
    setAllergies('');
    setSelectedVaccine('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Patient</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Patient Name</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Age</label>
          <input 
            type="number" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Sex</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Weight (kg)</label>
          <input 
            type="number" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Blood Group</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Medical Information</label>
          <textarea 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={medicalInfo}
            onChange={(e) => setMedicalInfo(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Allergies</label>
          <textarea 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Vaccine</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedVaccine}
            onChange={(e) => setSelectedVaccine(e.target.value)}
          >
            <option value="">Select a vaccine</option>
            {vaccines.map((vaccine, index) => (
              <option key={index} value={vaccine.name}>{vaccine.name}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleAddPatient} 
          className="w-full bg-green-500 text-white py-2 rounded-md shadow hover:bg-green-600"
        >
          Add Patient
        </button>
      </div>
    </div>
  );
}
