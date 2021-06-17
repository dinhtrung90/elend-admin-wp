import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CRow
} from '@coreui/react'
import {useHistory} from "react-router-dom";

const Page403 = () => {
  const history = useHistory();

  const backToHome = () => {
    history.push('/');
  }

  return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">403</h1>
                <h4 className="pt-3">Oops! You{'\''}re lost.</h4>
                <div className="text-muted float-left">
                  <p>You not have permission to view this page.</p>
                  <CButton color="info" onClick={backToHome}>Back To Home</CButton>
                </div>

              </div>
            </CCol>
          </CRow>
        </CContainer>
      </div>
  )
}

export default Page403
