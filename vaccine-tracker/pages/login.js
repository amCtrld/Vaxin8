import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === 'Medical Staff') {
      router.push('/');
    } else if (role === 'Patient') {
      const patients = JSON.parse(sessionStorage.getItem('patients')) || [];
      const patient = patients.find((p) => p.password === password);

      if (patient) {
        alert(`Welcome, ${patient.patientName}`);
        router.push('/patient-data'); // Redirect to a patient-specific data page
      } else {
        alert('Invalid password!');
      }
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex justify-center items-center">
      <form onSubmit={handleLogin} className="max-w-md w-full bg-white p-6 rounded shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        >
          <option value="">Select Role</option>
          <option value="Medical Staff">Medical Staff</option>
          <option value="Patient">Patient</option>
        </select>
        {role === 'Patient' && (
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 border rounded"
            required
          />
        )}
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
}
