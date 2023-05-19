import React, { useState } from 'react';
import './CarSellApp.css';

const CarSellForm = () => {
  // State variable for form data and validation
  const [formData, setFormData] = useState({
    carMake: '',
    carModel: '',
    year: '',
    mileage: '',
    condition: 'Excellent',
    features: [],
    transmission: 'Automatic',
    priceRange: 0,
    contactNumber: '',
  });

  const [formErrors, setFormErrors] = useState({
    carMake: false,
    carModel: false,
    year: false,
    mileage: false,
    contactNumber: false,
  });

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'radio' ? value : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  // Event handler for features checkbox changes
  const handleFeaturesChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      let updatedFeatures = [...prevData.features];
      if (checked) {
        updatedFeatures.push(value);
      } else {
        updatedFeatures = updatedFeatures.filter((feature) => feature !== value);
      }
      return {
        ...prevData,
        features: updatedFeatures,
      };
    });
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
    } else {
      console.log('Form contains errors. Please check the required fields.');
    }
  };

  // Form validation function
  const validateForm = () => {
    const errors = {
      carMake: false,
      carModel: false,
      year: false,
      mileage: false,
      contactNumber: false,
    };

    let isValid = true;

    // Check for empty fields
    if (formData.carMake.trim() === '') {
      errors.carMake = true;
      isValid = false;
    }

    if (formData.carModel.trim() === '') {
      errors.carModel = true;
      isValid = false;
    }

    if (formData.year.trim() === '') {
      errors.year = true;
      isValid = false;
    }

    if (formData.mileage.trim() === '') {
      errors.mileage = true;
      isValid = false;
    }

    if (formData.contactNumber.trim() === '') {
      errors.contactNumber = true;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <div className="car-sell-form">
      <h2>Car Sell App Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Car Make */}
        <div className={`form-group ${formErrors.carMake ? 'error' : ''}`}>
          <label htmlFor="carMake">Car Make:</label>
          <input
            type="text"
            id="carMake"
            name="carMake"
            value={formData.carMake}
            onChange={handleChange}
            required
          />
          {formErrors.carMake && <span className="error-message">Please enter the car make.</span>}
        </div>

        {/* Car Model */}
        <div className={`form-group ${formErrors.carModel ? 'error' : ''}`}>
          <label htmlFor="carModel">Car Model:</label>
          <input
            type="text"
            id="carModel"
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            required
          />
          {formErrors.carModel && <span className="error-message">Please enter the car model.</span>}
        </div>

        {/* Year */}
        <div className={`form-group ${formErrors.year ? 'error' : ''}`}>
          <label htmlFor="year">Year:</label>
          <input type="date" id="year" name="year" value={formData.year} onChange={handleChange} required />
          {formErrors.year && <span className="error-message">Please enter the year.</span>}
        </div>

        {/* Mileage */}
        <div className={`form-group ${formErrors.mileage ? 'error' : ''}`}>
          <label htmlFor="mileage">Mileage:</label>
          <input
            type="number"
            id="mileage"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            required
          />
          {formErrors.mileage && <span className="error-message">Please enter the mileage.</span>}
        </div>

        {/* Condition */}
        <div className="form-group">
          <label>Condition:</label>
          <div className="radio-group">
           <label>
              <input
                type="radio"
                name="condition"
                value="Excellent"
                checked={formData.condition === 'Excellent'}
                onChange={handleChange}
              />
              Excellent
            </label>
            <label>
              <input
                type="radio"
                name="condition"
                value="Good"
                checked={formData.condition === 'Good'}
                onChange={handleChange}
              />
              Good
            </label>
            <label>
              <input
                type="radio"
                name="condition"
                value="Fair"
                checked={formData.condition === 'Fair'}
                onChange={handleChange}
              />
              Fair
            </label>
            <label>
              <input
                type="radio"
                name="condition"
                value="Poor"
                checked={formData.condition === 'Poor'}
                onChange={handleChange}
              />
              Poor
            </label>
          </div>
        </div>

        {/* Features */}
        <div className="form-group">
          <label>Features:</label>
          <div className="checkbox-group">
          <label>
            <input
                type="checkbox"
                name="features"
                value="Air Conditioning"
                checked={formData.features.includes('Air Conditioning')}
                onChange={handleFeaturesChange}
              />
              Air Conditioning
            </label>
            <label>
              <input
                type="checkbox"
                name="features"
                value="Power Steering"
                checked={formData.features.includes('Power Steering')}
                onChange={handleFeaturesChange}
              />
              Power Steering
            </label>
            <label>
              <input
                type="checkbox"
                name="features"
                value="Power Windows"
                checked={formData.features.includes('Power Windows')}
                onChange={handleFeaturesChange}
              />
              Power Windows
            </label>
            <label>
              <input
                type="checkbox"
                name="features"
                value="ABS"
                checked={formData.features.includes('ABS')}
                onChange={handleFeaturesChange}
              />
              ABS
            </label>
            <label>
              <input
                type="checkbox"
                name="features"
                value="Navigation System"
                checked={formData.features.includes('Navigation System')}
                onChange={handleFeaturesChange}
              />
              Navigation System
            </label>
          </div>
        </div>

        {/* Transmission */}
        <div className="form-group">
          <label htmlFor="transmission">Transmission:</label>
          <select id="transmission" name="transmission" value={formData.transmission} onChange={handleChange}>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="form-group">
          <label htmlFor="priceRange">Price Range:</label>
          <input
            type="range"
            id="priceRange"
            name="priceRange"
            min="0"
            max="100000"
            step="1000"
            value={formData.priceRange}
            onChange={handleChange}
          />
        </div>

        {/* Contact Number */}
        <div className={`form-group ${formErrors.contactNumber ? 'error' : ''}`}>
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
          {formErrors.contactNumber && <span className="error-message">Please enter the contact number.</span>}
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CarSellForm;

