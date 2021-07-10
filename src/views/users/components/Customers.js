import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CPagination, CButton } from '@coreui/react'
import CDataTable from '../../components/widgets/table/CDataTable'
import CIcon from '@coreui/icons-react'
import { userActions } from '../actions'

const Customers = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  const usersData = useSelector((state) => state.users.customers)
  console.log('usersData=', usersData)

  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/customers?page=${newPage}`)
  }

  useEffect(() => {
    dispatch(userActions.getAllCustomers())
    currentPage !== page && setPage(currentPage)
  }, [dispatch, currentPage, page])

  const navigationToEmployerCreation = () => {
    history.push(`/employers/create`)
  }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" className="card-title mb-0">
                  {t('view.Users.title.Customers')}
                </h4>
              </CCol>
              <CCol sm="7" className="d-none d-md-block">
                <CButton
                  color="primary"
                  className="float-end"
                  onClick={navigationToEmployerCreation}
                >
                  <CIcon name="cil-pencil" />
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={usersData}
              fields={[
                {
                  key: 'name',
                  _classes: 'font-weight-bold',
                  label: t('view.Users.fields.CustomerInfo'),
                },
                { key: 'username', label: t('view.Users.fields.Username') },
                { key: 'registered', label: t('view.Users.fields.Registered') },
                { key: 'status', label: t('view.Users.fields.Status') },
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/edit/${item.id}`)}
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
  )
}

export default Customers
