"use client";

import React, { useState, useRef } from "react";
import ReactSelect from "react-select";
import "react-datepicker/dist/react-datepicker.css";

const NextForm = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Phone: "",
    Gender: null,
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
        if (!value) {
          error = "Gender is required";
        }
        break;
      case "Message":
        if (!value.trim()) {
          error = `${name} is required`;
        } else if (!/^[a-zA-Z\s\W]+$/.test(value)) {
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

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
    validateField(name, checked);
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      Gender: selectedOption,
    }));
    validateField("Gender", selectedOption);
  };

  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#374151",
      borderColor: state.isFocused ? "white" : "#374151",
      boxShadow: "none",
      borderRadius: "0.375rem", // Same as rounded-lg
      "&:hover": {
        borderColor: "white",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#374151",
      borderRadius: "0.375rem", // Same as rounded-lg
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "lightblue" : "#374151",
      color: state.isSelected ? "black" : "white",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "white",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "white",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "white",
    }),
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <form className="flex flex-col" onSubmit={submit}>
            <h1 className="text-gray-900 dark:text-white text-3xl mb-6">
              Advance Form
            </h1>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="FirstName"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    ${
                      errors.FirstName
                        ? "border-red-500"
                        : "focus:border-blue-500"
                    }`}
                  placeholder="Enter Your FirstName"
                  ref={Refs.FirstName}
                  value={formData.FirstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.FirstName && (
                  <p className="text-red-500">{errors.FirstName}</p>
                )}
              </div>
              <div>
                <label
                  for="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="LastName"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                    ${
                      errors.FirstName
                        ? "border-red-500"
                        : "focus:border-blue-500"
                    }`}
                  placeholder="Enter Your LastName"
                  ref={Refs.LastName}
                  value={formData.LastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.LastName && (
                  <p className="text-red-500">{errors.LastName}</p>
                )}
              </div>
              <div>
                <label
                  for="age"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="Age"
                  placeholder="Enter Your Age"
                  ref={Refs.Age}
                  value={formData.Age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                    ${errors.Age ? "border-red-500" : "focus:border-blue-500"}`}
                />
                {errors.Age && <p className="text-red-500">{errors.Age}</p>}
              </div>
              <div>
                <label
                  for="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  name="Phone"
                  placeholder="Enter Your Number"
                  ref={Refs.Phone}
                  value={formData.Phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                    ${
                      errors.Phone ? "border-red-500" : "focus:border-blue-500"
                    }`}
                />
                {errors.Phone && <p className="text-red-500">{errors.Phone}</p>}
              </div>
              <div>
                <label
                  for="birthdate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Birth Date
                </label>
                <input
                  type="date"
                  name="Birthdate"
                  placeholder="Enter Your Birthdate"
                  ref={Refs.Birthdate}
                  value={formData.Birthdate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                    ${
                      errors.Birthdate
                        ? "border-red-500"
                        : "focus:border-blue-500"
                    }`}
                />
                {errors.Birthdate && (
                  <p className="text-red-500">{errors.Birthdate}</p>
                )}
              </div>
              <div>
                <label
                  for="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <ReactSelect
                  name="Gender"
                  options={options}
                  ref={Refs.Gender}
                  value={formData.Gender}
                  onChange={handleSelectChange}
                  onBlur={() => validateField("Gender", formData.Gender)}
                  styles={customStyles}
                  className={`bg-transparent border border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                ${errors.Gender ? "border-red-500" : "focus:border-blue-500"}`}
                  // className="bg-yellow-400 fill-gray-900"
                  // styles={errors.Gender ? { control: (base) => ({ ...base, border: '1px solid red', borderRadius: '5px' }) } : {}}
                />
                {errors.Gender && (
                  <p className="text-red-500">{errors.Gender}</p>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                name="Email"
                placeholder="Enter Your Email"
                ref={Refs.Email}
                value={formData.Email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                ${errors.Email ? "border-red-500" : "focus:border-blue-500"}`}
              />
              {errors.Email && <p className="text-red-500">{errors.Email}</p>}
            </div>
            <div className="mb-6">
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="Password"
                placeholder="•••••••••"
                ref={Refs.Password}
                value={formData.Password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  ${
                    errors.Password ? "border-red-500" : "focus:border-blue-500"
                  }`}
              />
              {errors.Password && (
                <p className="text-red-500">{errors.Password}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                for="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <textarea
                name="Message"
                placeholder="Enter Your Message"
                ref={Refs.Message}
                value={formData.Message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  ${
                    errors.Message ? "border-red-500" : "focus:border-blue-500"
                  }`}
              />
              {errors.Message && (
                <p className="text-red-500">{errors.Message}</p>
              )}
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="Agree"
                  ref={Refs.Agree}
                  checked={formData.Agree}
                  onChange={handleCheckChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                    errors.Agree ? "border-red-500" : "focus:border-blue-500"
                  }`}
                />
                {errors.Agree && <p className="text-red-500">{errors.Agree}</p>}
              </div>
              <label
                for="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                I agree with the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </a>
                .
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NextForm;
