import React, {useEffect} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInvalidFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import {authActions} from "./login.action";
import {authHelpers} from "../../../utils/auth-helper";
import {useHistory} from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const authData = useSelector(state => state.auth);
  let schema = Yup.object({
    username: Yup.string()
      .required('Please enter a email'),
    password: Yup.string().required('Please enter a password')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(authActions.login(values));
    }
  });

  useEffect(() => {
    if (authData.isRedirect && authHelpers.isAuthenticated()) {
      history.push('/');
    }
  });

  return (
      <div className="c-app c-default-layout flex-row align-items-center login-page"
      style={{
        background: `url('${process.env.PUBLIC_URL}/images/elend-bg-2.png') no-repeat`,
        backgroundSize: `100%`
      }}>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={formik.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Username" autoComplete="username"
                          invalid={formik.errors.username && formik.touched.username}
                          value={formik.values.username}
                          {...formik.getFieldProps("username")}
                        />
                        <CInvalidFeedback>{formik.errors.username}</CInvalidFeedback>
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Password" autoComplete="current-password"
                          invalid={formik.errors.password && formik.touched.password}
                          value={formik.values.password}
                          {...formik.getFieldProps("password")}
                        />
                        <CInvalidFeedback>{formik.errors.password}</CInvalidFeedback>
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton type="submit" color="primary" className="px-4" >Login</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">Forgot password?</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
  )
}

export default Login