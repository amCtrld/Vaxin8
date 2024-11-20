import { useState } from 'react';
import { useRouter } from 'next/router';

export default function EligibilityPage() {
  const [age, setAge] = useState('');
  const [healthCondition, setHealthCondition] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const router = useRouter();

  const handleCheckEligibility = () => {
    let recommendationMessage = 'Eligible for all vaccines.';
    if (age < 12) {
      recommendationMessage = 'Eligible for pediatric vaccines only.';
    } else if (healthCondition.toLowerCase().includes('allergy')) {
      recommendationMessage =
        'Consult a doctor before receiving vaccines due to health conditions.';
    }
    setRecommendation(recommendationMessage);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-4 flex items-center justify-center"
      style={{ backgroundImage: "url('../images/vax.jpg')" }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-md p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Vaccine Eligibility Check
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheckEligibility();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Health Conditions (if any)
            </label>
            <textarea
              value={healthCondition}
              onChange={(e) => setHealthCondition(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe any health conditions"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Check Eligibility
          </button>
        </form>

        {recommendation && (
          <div className="mt-6 bg-gray-100 p-4 rounded shadow-md">
            <h2 className="text-lg font-bold text-blue-800 mb-2">
              Recommendation:
            </h2>
            <p className="text-gray-700">{recommendation}</p>
          </div>
        )}

        <button
          onClick={() => router.push('/dashboard')}
          className="w-full bg-blue-500 text-white py-2 px-4 mt-6 rounded hover:bg-blue-700 transition"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}