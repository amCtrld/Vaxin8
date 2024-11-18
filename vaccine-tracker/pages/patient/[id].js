import { useRouter } from 'next/router';

export default function PatientPage() {
  const router = useRouter();
  const { id } = router.query;

  const patients = JSON.parse(sessionStorage.getItem('patients')) || [];
  const patient = patients.find((p) => p.password === id);

  if (!patient) {
    return <div>Invalid Patient ID</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Patient Dashboard</h1>
      <div className="bg-white p-6 rounded shadow-md max-w-md">
        <h2 className="text-xl font-bold mb-4">{patient.name}</h2>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Sex:</strong> {patient.sex}</p>
        <p><strong>Vaccine:</strong> {patient.vaccine}</p>
        <p><strong>Doses:</strong> 3</p>
        <div className="mt-4">
          <label>
            <input type="checkbox" className="mr-2" />
            Dose 1
          </label>
          <br />
          <label>
            <input type="checkbox" className="mr-2" />
            Dose 2
          </label>
          <br />
          <label>
            <input type="checkbox" className="mr-2" />
            Dose 3
          </label>
        </div>
      </div>
    </div>
  );
}
