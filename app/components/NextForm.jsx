"use client";

import React, { useState, useRef } from "react";

const NextForm = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Phone: "",
    Gender: "",
    Age: "",
    Message: "",
    Agree: false,
    Birthdate: "",
  });

  const [errors, setErrors] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Phone: "",
    Gender: "",
    Age: "",
    Message: "",
    Agree: "",
    Birthdate: "",
  });

  const Refs = {
    FirstName: useRef(null),
    LastName: useRef(null),
    Email: useRef(null),
    Password: useRef(null),
    Phone: useRef(null),
    Gender: useRef(null),
    Age: useRef(null),
    Message: useRef(null),
    Agree: useRef(null),
    Birthdate: useRef(null),
    submitButton: useRef(null),
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "FirstName":
      case "LastName":
        if (!value.trim()) {
          error = `${name} is required`;
        } else if (!/^[a-zA-Z]+$/.test(value)) {
          error = `${name} should only contain alphabets`;
        }
        break;
      case "Email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Email is not valid";
        }
        break;
      case "Password":
        if (!value.trim()) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password should be at least 8 characters long";
        }
        break;
      case "Phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Phone number is not valid";
        }
        break;
      case "Gender":
        if (!value.trim()) {
          error = "Gender is required";
        }
        break;
      case "Message":
        if (!value.trim()) {
          error = `${name} is required`;
        } else if (!/^[a-zA-Z]+$/.test(value)) {
          error = `${name} should only contain alphabets`;
        }
        break;
      case "Birthdate":
        if (!value.trim()) {
          error = "Birthdate is required";
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Set time to the start of the day
          if (selectedDate >= today) {
            error = "Birthdate must be in the past";
          }
        }
        break;
      case "Age":
        if (!value.trim()) {
          error = "Age is required";
        } else if (!/^\d+$/.test(value)) {
          error = "Age must be a number";
        } else if (parseInt(value, 10) < 0 || parseInt(value, 10) > 120) {
          error = "Age must be a valid number between 0 and 120";
        }
        break;
      case "Agree":
        if (!value) {
          error = "You must agree to the terms and conditions";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error;
  };

  const submit = (e) => {
    e.preventDefault();
    let isValid = true;
    let firstInvalidField = null;

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        isValid = false;
        if (!firstInvalidField) {
          firstInvalidField = field; // Capture the first invalid field
        }
      }
    });

    if (isValid) {
      console.log(formData);
      // submit to server here
    } else if (firstInvalidField) {
      const fieldRef = Refs[firstInvalidField];
      if (fieldRef && fieldRef.current) {
        fieldRef.current.focus();
        fieldRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='max-w-md w-full bg-white p-8 rounded shadow-lg'>
        <h1 className='text-3xl mb-6'>Advance Form</h1>
        <form className='space-y-4' onSubmit={submit}>
          {/* FirstName */}
          <input
            type='text'
            name='FirstName'
            placeholder='Enter Your FirstName'
            ref={Refs.FirstName}
            value={formData.FirstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.FirstName ? "border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors.FirstName && (
            <p className='text-red-500'>{errors.FirstName}</p>
          )}
          {/* LastName */}
          <input
            type='text'
            name='LastName'
            placeholder='Enter Your LastName'
            ref={Refs.LastName}
            value={formData.LastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.LastName ? "border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors.LastName && <p className='text-red-500'>{errors.LastName}</p>}
          {/* Email */}
          <input
            type='email'
            name='Email'
            placeholder='Enter Your Email'
            ref={Refs.Email}
            value={formData.Email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.Email ? "border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors.Email && <p className='text-red-500'>{errors.Email}</p>}
          {/* Password */}
          <input
            type='password'
            name='Password'
            placeholder='Enter Your Password'
            ref={Refs.Password}
            value={formData.Password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.Password ? "border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors.Password && <p className='text-red-500'>{errors.Password}</p>}
          {/* Phone */}
          <input
            type='number'
            name='Phone'
            placeholder='Enter Your Number'
            ref={Refs.Phone}
            value={formData.Phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.Phone ? "border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors.Phone && <p className='text-red-500'>{errors.Phone}</p>}
          {/* Gender */}
          <select
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.Gender ? "border-red-500" : "focus:border-blue-500"
            }`}
            name='Gender'
            ref={Refs.Gender}
            value={formData.Gender}
            onChange={handleChange}
            onBlur={handleBlur}>
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </select>
          {errors.Gender && <p className='text-red-500'>{errors.Gender}</p>}
          {/* Age */}
          <input
            type='number'
            name='Age'
            placeholder='Enter Your Age'
            ref={Refs.Age}
            value={formData.Age}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.Age ? "border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors.Age && <p className='text-red-500'>{errors.Age}</p>}
          {/* Birthdate */}
          <input
            type='date'
            name='Birthdate'
            placeholder='Enter Your Birthdate'
            ref={Refs.Birthdate}
            value={formData.Birthdate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.Birthdate ? "border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors.Birthdate && (
            <p className='text-red-500'>{errors.Birthdate}</p>
          )}
          {/* Message */}
          <textarea
            name='Message'
            ref={Refs.Message}
            value={formData.Message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.Message ? "border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors.Message && <p className='text-red-500'>{errors.Message}</p>}
          {/* Agree */}
          <label>Agree</label>
          <input
            type='checkbox'
            name='Agree'
            ref={Refs.Agree}
            checked={formData.Agree}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.Agree ? "border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors.Agree && <p className='text-red-500'>{errors.Agree}</p>}
          <button
            type='submit'
            ref={Refs.submitButton}
            className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NextForm;
