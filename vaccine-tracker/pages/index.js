import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (role === 'Medical Staff') {
      if (password === 'Staff001') {
        router.push('/dashboard'); // Redirect to Dashboard
      } else {
        alert('Invalid password for Medical Staff.');
      }
    } else if (role === 'Patient') {
      const patients = JSON.parse(sessionStorage.getItem('patients')) || [];
      const patient = patients.find((p) => p.password === password);

      if (patient) {
        router.push(`/patient/${patient.password}`); // Redirect to Patient Page
      } else {
        alert('Invalid password. Please try again.');
      }
    } else {
      alert('Please select a role.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <div className="space-y-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">Select Role</option>
          <option value="Medical Staff">Medical Staff</option>
          <option value="Patient">Patient</option>
        </select>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
