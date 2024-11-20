import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import emailjs from 'emailjs-com'; // Import EmailJS

const Attendance = () => {
  const [value, setValue] = useState(new Date());
  const [patients, setPatients] = useState([]);
  const [attendedPatients, setAttendedPatients] = useState([]);

  useEffect(() => {
    const storedPatients = JSON.parse(sessionStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  const handleDateChange = (date) => {
    setValue(date);
  };

  const handleAttendanceChange = (index) => {
    const updatedPatients = [...patients];
    const patient = updatedPatients[index];
    patient.attended = !patient.attended; // Toggle attendance
    if (patient.attended) {
      setAttendedPatients([...attendedPatients, patient]);
    } else {
      setAttendedPatients(attendedPatients.filter(p => p !== patient));
    }
    setPatients(updatedPatients);
  };

  // Function to send reminder email via EmailJS
const handleSendReminder = (patient) => {
    // Extract the vaccine and dates from the patient data
    const vaccine = patient.vaccine;
    const doseDates = patient.doseDates.join(', ');  // Join dates into a string (in case there are multiple)
  
    const templateParams = {
      to_name: patient.name,
      to_email: patient.email,
      subject: 'Vaccine Appointment Reminder',
      message: `Dear ${patient.name},\n\nThis is a reminder for your upcoming vaccine appointment on ${doseDates}.\n\nThank you!`,
      vaccine: vaccine,  // Add vaccine type
      dates: doseDates,  // Add vaccine dates
    };
  
    // Use EmailJS to send the email
    emailjs.send('service_i815cit', 'template_8791p6o', templateParams, 'xW0rpdTWXp35bZiAt')
      .then((response) => {
        console.log('Email successfully sent:', response);
        alert(`Reminder sent to ${patient.name}!`);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send reminder email. Please try again later.');
      });
  };
  

  const filteredPatients = patients.filter((patient) => {
    const selectedDate = value.toLocaleDateString();
    return patient.doseDates.some(date => new Date(date).toLocaleDateString() === selectedDate);
  });

  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('../images/vax.jpg')" }}>
      <div className="flex items-center justify-center h-full">
        {/* Glassy Container */}
        <div className="w-full sm:w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12 bg-white/40 backdrop-blur-lg rounded-lg shadow-lg p-8">
          <h2 className="text-4xl text-white font-semibold text-center mb-6">Attendance Tracker</h2>

          {/* Calendar */}
          <div className="mb-6">
            <Calendar onChange={handleDateChange} value={value} className="shadow-xl rounded-lg" />
          </div>

          {/* Patient Table */}
          <div className="overflow-x-auto bg-white/60 backdrop-blur-lg rounded-lg shadow-xl mb-6">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border text-white">Name</th>
                  <th className="px-4 py-2 border text-white">Vaccine</th>
                  <th className="px-4 py-2 border text-white">Attendance</th>
                  <th className="px-4 py-2 border text-white">Reminder</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <tr key={index} className={`${patient.attended ? 'bg-green-200' : ''}`}>
                    <td className="px-4 py-2 border">{patient.name}</td>
                    <td className="px-4 py-2 border">{patient.vaccine}</td>
                    <td className="px-4 py-2 border">
                      <input
                        type="checkbox"
                        checked={patient.attended || false}
                        onChange={() => handleAttendanceChange(index)}
                        className="h-5 w-5"
                      />
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleSendReminder(patient)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Remind
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Attended Patients */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white">Attended Patients</h3>
              <ul>
                {attendedPatients.map((patient, index) => (
                  <li key={index} className="flex justify-between items-center py-2">
                    <span>{patient.name}</span>
                    <span>{patient.vaccine}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Return Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => window.location.href = '/dashboard'} // Redirect to dashboard
              className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
