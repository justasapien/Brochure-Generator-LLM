import React, { useState } from 'react';
import axios from 'axios';
import './MarketingCopyForm.css';

const MarketingCopyForm = () => {
  const [inputs, setInputs] = useState({
    brandPositioning: '',
    features: '',
    tone: 'Casual',
    length: 'Short',
  });

  const [output, setOutput] = useState('');
  const [dbButton, setButton] = useState('Insert in DB')
  const [dropdownValue, setDropdownValue] = useState('');
  const [highlightedText, setHighlightedText] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/generate', inputs);
      setOutput(response.data);
      setButton('Insert in DB')
    } catch (error) {
      console.error('Error generating marketing copy:', error);
    }
  };

  const handleInsert = async () => {
    try {
      const response = await axios.post('http://localhost:4000/insert', { marketingCopy: output, ...inputs });
      setButton('Inserted!')
      return response;
    } catch (error) {
      console.error('Error inserting marketing copy:', error);
    }
  };

  const handleRegenerate = async () => {
    if (!highlightedText) return;
    console.log(output);
    console.log('----------------- Regenerated output -----------------')
    const response = await axios.post('http://localhost:4000/regenerate', {
      highlightedText, output, dropdownValue
    });
    setOutput(response.data);
    console.log(response.data);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection().toString();
    setHighlightedText(selection);
  };


  return (
    <div className="form-container">
      <h1>Real Estate Brochure Generator</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Input A Brand Positioning</label>
          <input
            type="text"
            name="brandPositioning"
            value={inputs.brandPositioning}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Input B Features</label>
          <input
            type="text"
            name="features"
            value={inputs.features}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Input C Tone</label>
          <select name="tone" value={inputs.tone} onChange={handleChange}>
            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
            <option value="Grandiose">Grandiose</option>
          </select>
          <label>Input D Length</label>
          <select name="length" value={inputs.length} onChange={handleChange}>
            <option value="Short">Short</option>
            <option value="Medium">Medium</option>
            <option value="Long">Long</option>
          </select>
        </div>
        <div className="form-group">
        </div>
        <button type="submit" className="generate-btn">Generate</button>
      </form>
      <button className="insert-btn" onClick={() => {
        // Implement insert to DB logic here
        const output = handleInsert();
        console.log('Insert in DB:', output);
      }}>{dbButton}</button>
      <div className="output-container">
        <h2>OUTPUT</h2>
        <textarea value={output} readOnly onMouseUp={handleTextSelection} className="output" />
        <div>
          <select value={dropdownValue} onChange={e => setDropdownValue(e.target.value)}>
            <option value="">Select an option</option>
            <option value="Make it longer">Make it longer</option>
            <option value="Make it shorter">Make it shorter</option>
          </select>
          <button onClick={handleRegenerate} className='regenerate-btn'>Regenerate</button>
        </div>
      </div>
    </div>
  );
};

export default MarketingCopyForm;
