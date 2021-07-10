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
  CNavItem,
  CNavLink,
  CNav,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import { FaRegBuilding } from 'react-icons/fa'

const Organization = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const [focusInputColorText, setFocusInputColorText] = useState(false)

  const organizeText = {
    EditOrganization: 'Edit Organization',
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
    Overview: 'Overview',
    Members: 'Members',
    Invitations: 'Invitations',
    Branding: 'Branding',
    BrandingDesc: 'These are branding settings associated with your organization.',
    Logo: 'Organization Logo',
    LogoDesc:
      'If set, this is the logo that will be displayed to end-users for this organization in any interaction with them.',
    PrimaryColor: 'Primary Color',
    PrimaryColorDesc: `If set, this will be the primary color for CTAs that will be displayed to end-users for this organization in your application\'s authentication flows.`,
    DeleteOrg: 'Delete this organization',
    DeleteOrgDesc: `All user membership to this organization will be removed. Users won't be removed. Once confirmed, this operation can't be undone!`,
    Save: 'Save',
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
                  <FaRegBuilding size="2em" /> {organizeText.EditOrganization}
                </h4>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CNav>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>{organizeText.Overview}</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>{organizeText.Members}</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>{organizeText.Invitations}</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <CRow className="mt-4">
                    <CCol sm="12">
                      <h4>{organizeText.BasicInfo}</h4>
                      <p className="text-muted">{organizeText.BasicInfoDesc}</p>
                    </CCol>
                    <CCol sm="12">
                      <div>
                        <CFormLabel htmlFor="name">{organizeText.Name}</CFormLabel>
                        <CFormControl
                          id="name"
                          placeholder={organizeText.NamePlaceholder}
                          disabled
                        />
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
                    <CCol sm={12} className="mb-4">
                      <hr />
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <h4>{organizeText.Branding}</h4>
                      <p className="text-muted">{organizeText.BrandingDesc}</p>
                    </CCol>
                    <CCol sm={12}>
                      <CFormLabel className="font-weight-bold">{organizeText.Logo}</CFormLabel>
                    </CCol>
                    <CCol sm={12}>
                      <CFormLabel htmlFor="primaryColor" className="font-weight-bold">
                        {organizeText.PrimaryColor}
                      </CFormLabel>
                      <div
                        className={
                          focusInputColorText
                            ? 'color-picker-container color-picker-container-focus'
                            : 'color-picker-container'
                        }
                      >
                        <input
                          id="primaryColorPicker"
                          type="color"
                          className="input-color-picker no-outline"
                        />
                        <input
                          id="primaryColor"
                          className="input-color-text no-outline"
                          onBlur={() =>
                            setFocusInputColorText((focusInputColorText) => !focusInputColorText)
                          }
                          onFocus={() =>
                            setFocusInputColorText((focusInputColorText) => !focusInputColorText)
                          }
                        />
                      </div>
                    </CCol>
                    <CCol sm={12} className="text-center">
                      <CButton color="primary">{organizeText.Save} </CButton>
                    </CCol>
                  </CRow>
                </CTabPane>
                <CTabPane>2</CTabPane>
              </CTabContent>
            </CNav>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Organization
