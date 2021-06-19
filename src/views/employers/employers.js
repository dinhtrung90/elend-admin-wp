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

import employersData from './employersData';

import CIcon from '@coreui/icons-react';

const getBadge = (status) => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'secondary';
    case 'Pending':
      return 'warning';
    case 'Banned':
      return 'danger';
    default:
      return 'primary';
  }
};

const Employers = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const organizeText = {
    description: 'Represent the teams, business customers, and partner companies that access your applications as organizations',
    createOrganizationButton: 'Create Organization'
  }

  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage &&
      history.push(`/employers?page=${newPage}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const navigationToEmployerCreation = () => {
    history.push(`/employers/create`);
  };

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
                  className="float-right">
                  <FaPlus /> {organizeText.createOrganizationButton}
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={employersData}
              fields={[
                { key: 'name', _classes: 'font-weight-bold' },
                'employerKey',
                'address',
                'lastModifiedDate',
                'createdDate',
                'status'
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) =>
                history.push(`/employers/${item.id}`)
              }
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={5}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Employers;
