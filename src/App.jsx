import React, { useState, useEffect } from 'react';
import { Calculator, School, Moon, Sun, RotateCcw } from 'lucide-react';

function App() {
  const [totalClasses, setTotalClasses] = useState(0);
  const [attendedClasses, setAttendedClasses] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const minAttendancePercentage = 75;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const calculatePossibleBunks = () => {
    if (totalClasses === 0) return 0;
    
    const currentAttendance = (attendedClasses / totalClasses) * 100;
    const totalClassesNeededFor75 = Math.ceil((attendedClasses * 100) / minAttendancePercentage);
    const possibleBunks = totalClassesNeededFor75 - totalClasses;
    
    return possibleBunks > 0 ? possibleBunks : 0;
  };

  const getCurrentAttendance = () => {
    if (totalClasses === 0) return 0;
    return ((attendedClasses / totalClasses) * 100).toFixed(2);
  };

  const resetCalculator = () => {
    setTotalClasses(0);
    setAttendedClasses(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors duration-200">
      <div className="max-w-md mx-auto pt-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <School className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Bunk Buddy</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <button
                onClick={resetCalculator}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Reset calculator"
              >
                <RotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Total Number of Classes
              </label>
              <input
                type="number"
                min="0"
                value={totalClasses}
                onChange={(e) => setTotalClasses(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Classes Attended
              </label>
              <input
                type="number"
                min="0"
                max={totalClasses}
                value={attendedClasses}
                onChange={(e) => setAttendedClasses(Math.min(totalClasses, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
              />
            </div>

            <div className="bg-indigo-50 dark:bg-gray-700 rounded-lg p-4 mt-4 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Results</h2>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  Current Attendance: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{getCurrentAttendance()}%</span>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Possible Bunks: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{calculatePossibleBunks()}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  To maintain minimum {minAttendancePercentage}% attendance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;