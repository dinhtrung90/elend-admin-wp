import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
} from '@coreui/react';
import { FaRegBuilding, FaPlus } from "react-icons/fa";
import CIcon from '@coreui/icons-react';

const OrganizationCreation = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const organizeText = {
    description: 'Represent the teams, business customers, and partner companies that access your applications as organizations',
    createOrganizationButton: 'Create Organization'
  }

  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

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
                    {t('view.Organizations.title')}
                  </h4>
                  <p className="text-muted">{organizeText.description}</p>
                </CCol>
                <CCol sm="4" className="d-none d-md-block">
                  <CButton
                      color="primary"
                      className="float-right"
                      onClick={navigateToCreateOrganization}>
                    <FaPlus /> {organizeText.createOrganizationButton}
                  </CButton>
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

export default OrganizationCreation;
