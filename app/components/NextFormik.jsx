// // components/FormComponent.jsx

// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// // Define validation schema using Yup
// const validationSchema = Yup.object({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email address').required('Email is required')
// });

// const NextFormik = () => {
//   // Initial form values
//   const initialValues = {
//     name: '',
//     email: ''
//   };

//   // Handle form submission
//   const handleSubmit = (values) => {
//     console.log('Form data:', values);
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {() => (
//         <Form>
//           <div>
//             <label htmlFor="name">Name</label>
//             <Field
//               type="text"
//               id="name"
//               name="name"
//             />
//             <ErrorMessage name="name" component="div" />
//           </div>

//           <div>
//             <label htmlFor="email">Email</label>
//             <Field
//               type="email"
//               id="email"
//               name="email"
//             />
//             <ErrorMessage name="email" component="div" />
//           </div>

//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default NextFormik;
