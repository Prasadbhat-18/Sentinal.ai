import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, AlertTriangle, FileJson, CheckCircle } from 'lucide-react';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    // Simulate upload delay for UI effect
    setTimeout(() => {
      setIsUploading(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl glass-panel p-10">
        <div className="mb-8 border-b border-outline-variant/30 pb-4">
          <h1 className="font-display text-3xl font-bold text-on-surface flex items-center gap-3">
            <FileJson className="text-primary w-8 h-8" />
            Data Intake Sequence
          </h1>
          <p className="text-on-surface-variant mt-2 font-mono text-sm">Initialize secure localized ingestion of raw telemetry logs.</p>
        </div>

        <div 
          className="border-2 border-dashed border-outline-variant/50 hover:border-primary/50 transition-colors bg-surface-container-low p-12 flex flex-col items-center justify-center text-center cursor-pointer relative"
          onClick={() => document.getElementById('file-upload').click()}
        >
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            accept=".json,.csv" 
            onChange={handleFileChange}
          />
          
          {file ? (
            <div className="flex flex-col items-center">
              <CheckCircle className="w-12 h-12 text-secondary-container mb-4" />
              <p className="text-on-surface font-mono">{file.name}</p>
              <p className="text-outline text-xs mt-2">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <>
              <UploadCloud className="w-12 h-12 text-outline mb-4" />
              <h3 className="text-lg font-bold mb-2">Drop Your History</h3>
              <p className="text-sm text-on-surface-variant max-w-sm">
                Drag and drop raw telemetry files (Chrome JSON or Google Takeout) into this sector or click to browse.
              </p>
            </>
          )}
        </div>

        {file && (
          <div className="mt-8 flex justify-end">
            <button 
              className="btn-primary w-full sm:w-auto flex justify-center items-center gap-2"
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-surface border-t-primary rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : 'Execute Analysis'}
            </button>
          </div>
        )}

        <div className="mt-8 p-4 bg-[#1a1b21]/50 border border-outline-variant/20 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-tertiary shrink-0" />
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-on-surface mb-1">Zero-Retention Policy</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Why we don't store your raw logs: Analysis is performed locally. Data evaporates upon session termination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
