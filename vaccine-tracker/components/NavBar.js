import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-center">
      <Link href="/" className="mx-4">Dashboard</Link>
      <Link href="/vaccine" className="mx-4">Add Vaccine</Link>
      <Link href="/patient" className="mx-4">Add Patient</Link>
      <Link href="/all-vaccines" className="mx-4">All Vaccines</Link>
      <Link href="/all-patients" className="mx-4">All Patients</Link>
    </nav>
  );
}
