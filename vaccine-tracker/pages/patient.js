import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PatientPage() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [medicalInfo, setMedicalInfo] = useState('');
  const [vaccine, setVaccine] = useState('');
  const router = useRouter();

  const vaccines = JSON.parse(sessionStorage.getItem('vaccines')) || [];

  const handleAddPatient = () => {
    const password = `P${Math.random().toString(36).substr(2, 8)}`;
    const existingPatients = JSON.parse(sessionStorage.getItem('patients')) || [];
    const newPatient = { name, age, sex, bloodGroup, medicalInfo, vaccine, password };
    sessionStorage.setItem('patients', JSON.stringify([...existingPatients, newPatient]));
    setName('');
    setAge('');
    setSex('');
    setBloodGroup('');
    setMedicalInfo('');
    setVaccine('');
    alert(`Patient added successfully! Password: ${password}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-6">Add Patient</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="block mb-2 font-medium">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="block mb-2 font-medium">Sex</label>
        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="" disabled>Select sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label className="block mb-2 font-medium">Blood Group</label>
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="" disabled>Select blood group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <label className="block mb-2 font-medium">Medical Info</label>
        <textarea
          value={medicalInfo}
          onChange={(e) => setMedicalInfo(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="block mb-2 font-medium">Vaccine</label>
        <select
          value={vaccine}
          onChange={(e) => setVaccine(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="" disabled>Select a vaccine</option>
          {vaccines.map((vaccine, index) => (
            <option key={index} value={vaccine.name}>
              {vaccine.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddPatient}
          className="bg-green-500 text-white px-6 py-2 rounded w-full"
        >
          Add Patient
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 bg-gray-500 text-white px-6 py-2 rounded w-full"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
