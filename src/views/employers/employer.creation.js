import React, { useState } from 'react'
import { employerActions } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CCardBody,
  CFormLabel,
  CFormControl,
  // CInputFile,
  CCardFooter,
  CButton,
  CFormFeedback,
  CSpinner,
  CForm,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const EmployerCreation = () => {
  const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    street: '',
    city: '',
    country: '',
    creating: false,
    success: false,
  }

  const [employer, setEmployer] = useState(initialState)

  const [submitted, setSubmitted] = useState(false)

  const creating = useSelector((state) => state.employerCreation.creating)

  const dispatch = useDispatch()

  function handleChange(e) {
    const { name, value } = e.target
    setEmployer((employer) => ({ ...employer, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (employer.name && employer.email && employer.phone) {
      dispatch(employerActions.creatEmployer(employer))
    }
  }

  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CRow xl={12}>
          <CCol xl={12} sm="6">
            <CCard>
              <CCardHeader>
                Employer Creation
                <small> Form</small>
              </CCardHeader>
              <CCardBody>
                <div>
                  <CFormLabel htmlFor="clientName">Employer Name</CFormLabel>
                  <CFormControl
                    // {...submitted && !employer.name && employer.name.length > 0 ? 'valid' : 'invalid'}
                    id="clientName"
                    name="name"
                    placeholder="Enter your employer name"
                    onChange={handleChange}
                    value={employer.name}
                  />
                  {/*{!employer.name && employer.name.length > 0 ? (*/}
                  {/*  <CValidFeedback>Employer name is valid</CValidFeedback>*/}
                  {/*) : (*/}
                  {/*  <CFormFeedback>Employer name is invalid</CFormFeedback>*/}
                  {/*)}*/}
                </div>
                <div>
                  <CFormLabel htmlFor="email-input">Email Input</CFormLabel>
                  <CFormControl
                    type="email"
                    id="email-input"
                    name="email"
                    onChange={handleChange}
                    value={employer.email}
                    placeholder="Enter Email"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <CFormLabel htmlFor="phone-input">Phone Input</CFormLabel>
                  <CFormControl
                    type="phone"
                    id="phone-input"
                    name="phone"
                    onChange={handleChange}
                    value={employer.phone}
                    placeholder="Enter Phone"
                  />
                </div>
                <div>
                  <CFormLabel htmlFor="street">Street</CFormLabel>
                  <CFormControl
                    id="street"
                    placeholder="Enter street name"
                    name="street"
                    onChange={handleChange}
                    value={employer.street}
                  />
                </div>
                <div>
                  <div>
                    <CFormLabel htmlFor="city">City</CFormLabel>
                    <CFormControl
                      id="city"
                      placeholder="Enter your city"
                      name="city"
                      onChange={handleChange}
                      value={employer.city}
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <CFormLabel htmlFor="country">Country</CFormLabel>
                    <CFormControl
                      id="country"
                      placeholder="Enter your country"
                      name="country"
                      onChange={handleChange}
                      value={employer.country}
                    />
                  </div>
                </div>

                <div row>
                  <CFormLabel col md="2" htmlFor="file-input">
                    Login upload
                  </CFormLabel>
                  <CCol xs="12" md="10">
                    {/*<CInputFile id="file-input" name="file-input"/>*/}
                  </CCol>
                </div>
                <CCardFooter>
                  <CButton type="submit" size="sm" color="primary">
                    {submitted && creating ? (
                      <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                    ) : (
                      <CIcon name="cil-scrubber" />
                    )}
                    {creating ? 'Loading...' : 'Submit'}
                  </CButton>
                </CCardFooter>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default EmployerCreation
