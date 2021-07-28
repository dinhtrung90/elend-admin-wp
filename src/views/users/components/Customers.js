import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { userActions } from '../actions'
import CDataTable from '../../components/widgets/table/CDataTable'
import CPagination from '../../components/widgets/pagination/CPagination'

const Customers = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  const isFetching = useSelector((state) => state.users.isFetching)
  const usersData = useSelector((state) => state.users.eligibilities)
  const itemsPerPage = useSelector((state) => state.users.itemsPerPage)
  const totalPages = useSelector((state) => state.users.totalPages)
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/customers?page=${newPage === 0 ? 1 : newPage}`)
  }

  const onPaginationChange = (numberItemsPerPage) => {
    dispatch(userActions.getAllEligibility({ page: 0, size: numberItemsPerPage }))
  }

  useEffect(() => {
    const loadData = async () => {
      await getAllEligibility()
    }
    loadData()
  }, [dispatch, currentPage, page])

  const getAllEligibility = async () => {
    dispatch(
      userActions.getAllEligibility({
        page: currentPage > 1 ? currentPage - 1 : 0,
        size: itemsPerPage,
      }),
    )
    setPage(currentPage)
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
                <CButton color="primary" className="float-end">
                  <CIcon name="cil-pencil" />
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              loading={isFetching}
              items={usersData}
              fields={[
                {
                  key: 'name',
                  _classes: 'font-weight-bold',
                  label: t('view.UserRoles.UserRoleName'),
                },
                { key: 'description', label: t('common.Description') },
                { key: 'createdDate', label: t('common.CreatedDate') },
                { key: 'action', label: t('common.Action') },
              ]}
              hover
              striped
              itemsPerPage={itemsPerPage}
              activePage={currentPage - 1}
              clickableRows
              onPaginationChange={onPaginationChange}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={totalPages}
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
