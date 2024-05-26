"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface UploadResult {
  date: string;
  amount: string;
}

const Home = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post<UploadResult>('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading the file', error);
    }
  };

  return (
    <div>
      <h1>Receipt OCR</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {result && (
        <div>
          <h2>Result</h2>
          <p>Date: {result.date}</p>
          <p>Amount: {result.amount}</p>
        </div>
      )}
    </div>
  );
};

export default Home;