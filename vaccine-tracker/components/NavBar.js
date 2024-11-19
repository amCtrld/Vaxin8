import { useRouter } from 'next/router';

export default function NavBar({ role }) {
  const router = useRouter();

  if (role !== 'Medical Staff') return null; // Hide navbar for patients

  return (
    <nav className="bg-blue-300 text-white p-4">
      <div className="flex gap-4">
        <button onClick={() => router.push('/dashboard')}>Dashboard</button>
        <button onClick={() => router.push('/all-vaccines')}>All Vaccines</button>
        <button onClick={() => router.push('/all-patients')}>All Patients</button>
      </div>
    </nav>
  );
}
