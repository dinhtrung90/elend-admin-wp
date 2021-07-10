import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CFormLabel,
  CFormControl,
} from '@coreui/react'
import { FaRegBuilding } from 'react-icons/fa'

const OrganizationCreation = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const organizeText = {
    AddOrganization: 'Add Organization',
    BasicInfo: 'Basic Info',
    BasicInfoDesc: 'These are basic details needed to set up your new organization.',
    Name: 'Name',
    NamePlaceholder: 'Enter a human-readable identifier for this organization',
    NameDesc:
      'This is any human-readable identifier for the organization that will be used by end-users to direct them to their organization in your application. This name cannot be changed.',
    DisplayName: 'Display Name',
    DisplayNamePlaceHolder: 'Enter a friendly name for this organization',
    DisplayDesc:
      'If set, this is the name that will be displayed to end-users for this organization in any interaction with them.',
  }

  const navigateToCreateOrganization = () => {
    console.log('navigateToCreateOrganization')
  }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="8">
                <h4 id="traffic" className="card-title mb-0">
                  <FaRegBuilding size="2em" /> {organizeText.AddOrganization}
                </h4>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <div>
                  <CFormLabel htmlFor="name">{organizeText.Name}</CFormLabel>
                  <CFormControl id="name" placeholder={organizeText.NamePlaceholder} required />
                  <p className="text-muted">{organizeText.NameDesc}</p>
                </div>
              </CCol>
              <CCol sm="12">
                <div>
                  <CFormLabel htmlFor="displayName">{organizeText.DisplayName}</CFormLabel>
                  <CFormControl
                    id="displayName"
                    placeholder={organizeText.DisplayNamePlaceHolder}
                    required
                  />
                  <p className="text-muted">{organizeText.DisplayDesc}</p>
                </div>
              </CCol>
              <CCol sm="12" className="text-center">
                <CButton color="primary" onClick={navigateToCreateOrganization}>
                  {organizeText.AddOrganization}{' '}
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default OrganizationCreation
