import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Navbar, { bellowNavbarCSSHeight } from '../components/Navbar';
import useUser from '../hooks/useUser';

const loginScheme = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(5)
    .max(16)
    .required(),
});

const Login = () => {
  const [tries, setTries] = useState(0);
  const user = useUser();
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginScheme,
    onSubmit: async (values, helpers) => {
      await new Promise(resolve => setTimeout(resolve, 5000));
      const login = await user.login(values.email, values.password);
      if (!login) setTries(tries + 1);
    }
  })

  return <>
    <Navbar />
    <div style={{height: bellowNavbarCSSHeight}} className="d-flex justify-content-center align-items-center">
      <form onSubmit={formik.handleSubmit} style={{minWidth: '400px'}}>

        <p className="text-info"><b>Hint: admin@admin.com</b></p>
        <div className="mb-3">
          <label htmlFor="exampleInputLogin1" className="form-label">Email</label>
          <input name="email" type="login" className="form-control" id="exampleInputLogin1" aria-describedby="loginHelp" onChange={formik.handleChange}/>
        </div>
        {formik.errors.email && <div className="alert alert-danger" role="alert">
          {formik.errors.email}
        </div>}

        <p className="text-info"><b>Hint: admin</b></p>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input name="password" type="password" className="form-control" id="exampleInputPassword1" onChange={formik.handleChange}/>
        </div>
        {formik.errors.password && <div className="alert alert-danger" role="alert">
          {formik.errors.password}
        </div>}

        <button type="submit" className="mb-3 btn btn-primary" disabled={formik.isSubmitting || !!formik.errors.email || !!formik.errors.password}>
          {formik.isSubmitting && <>
            <span className="me-1 spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            Fake spinner...
          </>}
          {!formik.isSubmitting && <>Submit</>}
        </button>
        
        {tries > 0 && <div className="alert alert-danger" role="alert">Failed to login - try again</div>}
      </form>
    </div>
  </>;
}

export default Login;