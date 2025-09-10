
import React, { useState, useMemo } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';
import { UploadIcon, CheckCircleIcon, SparklesIcon } from '../components/icons';
import { GoogleGenAI } from "@google/genai";

// This is a mock service. In a real app, API_KEY would come from process.env
// and this file would be in a `services` directory.
const mockGeminiSummarize = async (fileName: string): Promise<string> => {
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (!process.env.API_KEY) {
       console.warn("API_KEY environment variable not set. Using mock response.");
       return `This document, '${fileName}', appears to be a standard Affidavit of Urgency. It outlines the critical need for an expedited hearing concerning the 'State v. John Doe' case. Key points include the imminent risk of evidence tampering and the defendant being a flight risk. The document requests the court's immediate attention.`;
    }

    try {
        const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
        // In a real scenario, you would send document content, not just the name.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Summarize the key legal points of a document named: ${fileName}. Assume it is an affidavit of urgency for a criminal case.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Error generating summary. Please try again later.";
    }
}


const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <React.Fragment key={step}>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-primary-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {currentStep > step ? <CheckCircleIcon className="w-5 h-5" /> : step}
            </div>
            <p className={`ml-2 ${currentStep >= step ? 'text-primary-800 dark:text-primary-300 font-semibold' : 'text-gray-500'}`}>
              Step {step}
            </p>
          </div>
          {step < totalSteps && <div className="flex-auto border-t-2 transition duration-500 ease-in-out mx-4 border-gray-300"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};


const ServeDocument: React.FC = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerateSummary = async () => {
    if (!file) return;
    setIsSummarizing(true);
    setSummary('');
    const result = await mockGeminiSummarize(file.name);
    setSummary(result);
    setIsSummarizing(false);
  };

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.barNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Upload Document</h3>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
              <UploadIcon className="w-12 h-12 mx-auto text-gray-400" />
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {file ? `Selected file: ${file.name}` : 'Drag and drop your file here or click to upload.'}
              </p>
              <input type="file" className="hidden" id="file-upload" onChange={handleFileChange} />
              <label htmlFor="file-upload" className="cursor-pointer mt-4 inline-block bg-primary-700 text-white font-bold py-2 px-4 rounded hover:bg-primary-800">
                Choose File
              </label>
            </div>
            {file && (
              <div className="mt-4 text-center">
                 <button 
                  onClick={handleGenerateSummary}
                  disabled={isSummarizing}
                  className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-600 disabled:bg-yellow-300 inline-flex items-center"
                >
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  {isSummarizing ? 'Generating...' : 'Summarize with AI'}
                </button>
                {isSummarizing && <div className="w-5 h-5 border-4 border-dashed rounded-full animate-spin border-primary-800 mx-auto mt-4"></div>}
                {summary && (
                  <div className="mt-4 text-left p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">AI Summary:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{summary}</p>
                  </div>
                )}
              </div>
            )}
            <div className="text-right mt-6">
              <button
                onClick={() => setStep(2)}
                disabled={!file}
                className="bg-primary-800 text-white font-bold py-2 px-6 rounded hover:bg-primary-900 disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Select Recipient</h3>
            <input
              type="text"
              placeholder="Search by name or bar number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
            />
            <div className="max-h-96 overflow-y-auto">
              {filteredUsers.map(user => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer ${selectedUser?.id === user.id ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.barNumber} - {user.firm}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(1)} className="bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded hover:bg-gray-400">Back</button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedUser}
                className="bg-primary-800 text-white font-bold py-2 px-6 rounded hover:bg-primary-900 disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Review and Serve</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-600 dark:text-gray-400">Document:</h4>
                <p className="text-gray-800 dark:text-gray-200">{file?.name}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-600 dark:text-gray-400">Recipient:</h4>
                <div className="flex items-center mt-2">
                  <img src={selectedUser?.avatar} alt={selectedUser?.name} className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{selectedUser?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedUser?.barNumber}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(2)} className="bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded hover:bg-gray-400">Back</button>
              <button onClick={() => alert('Document served successfully!')} className="bg-green-600 text-white font-bold py-2 px-6 rounded hover:bg-green-700">Serve Document</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Serve a Court Process
      </h1>
      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <StepIndicator currentStep={step} totalSteps={3} />
        {renderStep()}
      </div>
    </>
  );
};

export default ServeDocument;
