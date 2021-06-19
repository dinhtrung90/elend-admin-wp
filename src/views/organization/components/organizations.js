import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react';
import { FaRegBuilding, FaPlus } from "react-icons/fa";

const Organizations = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const organizeText = {
    description: 'Represent the teams, business customers, and partner companies that access your applications as organizations',
    createOrganizationButton: 'Create Organization'
  }

  const navigateToCreateOrganization = () => {
    history.push('/organizations/create');
  }

  return (
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol sm="8">
                  <h4 id="traffic" className="card-title mb-0">
                    {t('view.Organizations.title')}
                  </h4>
                  <p className="text-muted">{organizeText.description}</p>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol className="text-center">
                  <h1 className="mb-4">Organizations</h1>
                  <FaRegBuilding width="100px" color="#bcbaff" size="10em" className="mb-4"/>
                  <p className="mb-4">{organizeText.description}</p>
                  <CButton
                      color="primary" className="mb-4" onClick={navigateToCreateOrganization}>
                    <FaPlus /> {organizeText.createOrganizationButton}
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
  );
};

export default Organizations;
