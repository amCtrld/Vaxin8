import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

export default function AddPatientForm({ onPatientAdded }) {
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [email, setEmail] = useState('');
  const [selectedVaccine, setSelectedVaccine] = useState('');
  const [doseDates, setDoseDates] = useState([]);
  const [vaccines, setVaccines] = useState([]);

  // Fetch vaccines from sessionStorage
  useEffect(() => {
    const storedVaccines = JSON.parse(sessionStorage.getItem('vaccines')) || [];
    setVaccines(storedVaccines);
  }, []);

  // Handle date inputs based on vaccine doses
  const handleVaccineChange = (vaccineName) => {
    setSelectedVaccine(vaccineName);
    const vaccine = vaccines.find((v) => v.name === vaccineName);
    if (vaccine) {
      setDoseDates(new Array(vaccine.doses).fill(''));
    }
  };

  const handleDateChange = (index, value) => {
    const updatedDates = [...doseDates];
    updatedDates[index] = value;
    setDoseDates(updatedDates);
  };

  const generatePassword = () => {
    return Math.random().toString(36).slice(-8); // Generate random 8-character password
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!selectedVaccine || doseDates.some((date) => !date)) {
      alert('Please select a vaccine and complete all dose dates.');
      return;
    }

    const password = generatePassword();

    const newPatient = {
      name,
      sex,
      age,
      medicalHistory,
      bloodGroup,
      email,
      vaccine: selectedVaccine,
      password,
      doseDates,
    };

    // Save patient in sessionStorage
    const existingPatients = JSON.parse(sessionStorage.getItem('patients')) || [];
    sessionStorage.setItem('patients', JSON.stringify([...existingPatients, newPatient]));

    // Send email
    const emailContent = {
      to_name: name,
      to_email: email,
      vaccine_name: selectedVaccine,
      doses: doseDates.length,
      dates: doseDates.join(', '),
      password,
    };

    emailjs
      .send(
        'service_i815cit', // Replace with your EmailJS service ID
        'template_igyzlpf', // Replace with your EmailJS template ID
        emailContent,
        'xW0rpdTWXp35bZiAt' // Replace with your EmailJS user ID
      )
      .then(() => {
        alert('Patient added and email sent successfully!');
        onPatientAdded(newPatient); // Update parent component
      })
      .catch((err) => {
        alert('Failed to send email. Please try again.');
        console.error(err);
      });

    // Reset form
    setName('');
    setSex('');
    setAge('');
    setMedicalHistory('');
    setBloodGroup('');
    setEmail('');
    setSelectedVaccine('');
    setDoseDates([]);
  };

  return (
    <form onSubmit={handleAddPatient}>
      <label className="block mb-2 font-medium">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <label className="block mb-2 font-medium">Sex</label>
      <input
        type="text"
        value={sex}
        onChange={(e) => setSex(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <label className="block mb-2 font-medium">Age</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <label className="block mb-2 font-medium">Medical History</label>
      <textarea
        value={medicalHistory}
        onChange={(e) => setMedicalHistory(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <label className="block mb-2 font-medium">Blood Group</label>
      <input
        type="text"
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <label className="block mb-2 font-medium">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <label className="block mb-2 font-medium">Vaccine</label>
      <select
        value={selectedVaccine}
        onChange={(e) => handleVaccineChange(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      >
        <option value="" disabled>Select a vaccine</option>
        {vaccines.map((vaccine) => (
          <option key={vaccine.name} value={vaccine.name}>
            {vaccine.name}
          </option>
        ))}
      </select>
      {doseDates.map((date, index) => (
        <div key={index}>
          <label className="block mb-2 font-medium">Dose {index + 1} Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => handleDateChange(index, e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded w-full">
        Add Patient
      </button>
    </form>
  );
}
