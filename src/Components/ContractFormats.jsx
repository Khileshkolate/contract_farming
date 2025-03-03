import { useState } from 'react';
import { FaDownload, FaUpload } from 'react-icons/fa';

const contracts = [
  {
    id: 1,
    title: 'Market-Specification Contract',
    description: 'Specifies the quality, quantity, and price at which crops will be purchased by the buyer.',
    file: 'src/ContractForm/f1 (1).pdf',
  },
  {
    id: 2,
    title: 'Resource-Providing Contract',
    description: 'Buyer provides essential resources such as seeds, fertilizers, and technical guidance.',
    file: 'src/ContractForm/f2.pdf',
  },
  {
    id: 3,
    title: 'Production-Management Contract',
    description: 'Buyer offers management assistance to ensure the product meets specific standards.',
    file: 'src/ContractForm/f3.pdf',
  },
  {
    id: 4,
    title: 'Land-Leasing Contract',
    description: 'Buyer leases land from the farmer for crop production, often providing resources or technical know-how.',
    file: 'src/ContractForm/f4.pdf',
  },
  {
    id: 5,
    title: 'Buyback Agreement Contract',
    description: 'Guarantees that the buyer will purchase the entire output of the farmer’s crop at a pre-agreed price.',
    file: 'src/ContractForm/f5.pdf',
  },
  {
    id: 6,
    title: 'Joint-Venture Contract',
    description: 'Buyer and farmer share the profits, risks, and responsibilities of the farming operation.',
    file: 'src/ContractForm/f6.pdf',
  },
];

export default function ContractFormats() {
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleFileUpload = (event, contractId) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles((prev) => ({ ...prev, [contractId]: file.name }));
      alert(`You uploaded: ${file.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Contract Farming Formats</h1>
        
        <div className="space-y-6">
          {contracts.map((contract) => (
            <div key={contract.id} className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-gray-800">{contract.title}</h2>
              <p className="text-gray-600 mt-2">{contract.description}</p>
              
              <div className="flex items-center justify-between mt-4">
                <a
                  href={contract.file}
                  download
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  <FaDownload /> Download PDF
                </a>
                
                <div className="relative">
                  <label
                    htmlFor={`upload-${contract.id}`}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-green-700 transition"
                  >
                    <FaUpload /> Upload PDF
                  </label>
                  <input
                    type="file"
                    id={`upload-${contract.id}`}
                    accept=".pdf"
                    className="hidden"
                    onChange={(event) => handleFileUpload(event, contract.id)}
                  />
                </div>
              </div>
              
              {uploadedFiles[contract.id] && (
                <p className="text-sm text-green-600 mt-2">Uploaded: {uploadedFiles[contract.id]}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
