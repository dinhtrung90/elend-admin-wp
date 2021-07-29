import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFormControl,
  CFormLabel,
  CFormText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { userActions } from '../../../actions'
import CDataTable from '../../components/widgets/table/CDataTable'
import CPagination from '../../components/widgets/pagination/CPagination'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa'

const Eligibilities = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  const isFetching = useSelector((state) => state.users.isFetching)
  const usersData = useSelector((state) => state.users.rewardEligibilities)
  const eligibilityDetail = useSelector((state) => state.users.rewardEligibilityDetail)
  const itemsPerPage = useSelector((state) => state.users.itemsPerPageReward)
  const totalPages = useSelector((state) => state.users.totalPages)
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [rewardPopup, setRewardPopup] = useState(false)
  const [isPassCode, setIsPassCode] = useState(true)
  const [passCodeInput, setPassCodeInput] = useState('')

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/danhsach?page=${newPage === 0 ? 1 : newPage}`)
  }

  const onPaginationChange = (numberItemsPerPage) => {
    dispatch(userActions.getAllPublicEligibility({ page: 0, size: numberItemsPerPage }))
  }

  useEffect(() => {}, [currentPage, page])

  const getAllEligibility = async () => {
    dispatch(
      userActions.getAllPublicEligibility({
        page: currentPage > 1 ? currentPage - 1 : 0,
        size: itemsPerPage,
      }),
    )
    setPage(currentPage)
  }

  const onRowClick = (item) => {
    dispatch(userActions.getPublicEligibilityDetail(item)).then((r) => {
      setRewardPopup(!rewardPopup)
    })
  }

  const onChangePassCode = (e) => {
    setPassCodeInput(e.target.value)
  }

  const handleConfirmPassCode = () => {
    if (process.env.REACT_APP_QUATANG_ELIGIBILITY_CODE !== passCodeInput) return
    setIsPassCode(false)
    getAllEligibility()
  }

  return (
    <div
      className="d-flex flex-row align-items-center min-vh-100 thanks-reward-container"
      style={{ position: 'relative' }}
    >
      <div
        style={{
          background: `url('${process.env.PUBLIC_URL}/images/bg-covid.jpeg') no-repeat`,
          backgroundSize: `cover`,
          opacity: 0.3,
          zIndex: 0,
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      ></div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol sm="12">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CDataTable
                  loading={isFetching}
                  items={usersData}
                  fields={[
                    { key: 'phone', label: 'Số điện thoại' },
                    { key: 'fullName', label: 'Họ và tên' },
                    { key: 'company', label: 'Công ty' },
                    { key: 'employeeId', label: 'Mã nhân viên' },
                    { key: 'ssn', label: 'CMND/CCCD' },
                  ]}
                  hover
                  tableFilter
                  striped
                  itemsPerPage={itemsPerPage}
                  activePage={currentPage - 1}
                  clickableRows
                  onRowClick={(item) => onRowClick(item)}
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

              <CModal visible={isPassCode} color="danger">
                <CModalHeader>
                  <CModalTitle>Mã Pin</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CFormLabel htmlFor="passCodeInput">Nhập mã pin</CFormLabel>
                  <CFormControl
                    id="passCodeInput"
                    name="passCodeInput"
                    value={passCodeInput}
                    onChange={(e) => onChangePassCode(e)}
                  />
                </CModalBody>
                <CModalFooter className="flex-center">
                  <CButton color="success" onClick={handleConfirmPassCode}>
                    Xác nhận
                  </CButton>
                </CModalFooter>
              </CModal>

              <CModal
                visible={rewardPopup}
                onClose={() => setRewardPopup(!rewardPopup)}
                color="success"
              >
                <CModalHeader>
                  <CModalTitle>Thông tin khách hàng</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  {eligibilityDetail ? (
                    <CRow>
                      <CCol sm="12" className="flex-left">
                        <CFormLabel>Họ và tên:</CFormLabel>
                        <p className="ms-1">{eligibilityDetail.fullName}</p>
                      </CCol>
                      <CCol sm="12" className="flex-left">
                        <CFormLabel>Số điện thoại:</CFormLabel>
                        <p className="ms-1">{eligibilityDetail.phone}</p>
                      </CCol>
                      <CCol sm="12" className="flex-left">
                        <CFormLabel>Mã nhận quà:</CFormLabel>
                        <p className="ms-1 font-weight-bold">{eligibilityDetail.rewardCode}</p>
                      </CCol>
                      <CCol sm="12" className="flex-left">
                        <CFormLabel className="me-1">Trình trạng nhận quà:</CFormLabel>
                        {eligibilityDetail.hasPresent ? (
                          <FaRegCheckSquare size="1.5em" />
                        ) : (
                          <FaRegSquare size="1.5em" />
                        )}
                      </CCol>
                      <CCol sm="12" className="flex-left">
                        <CFormLabel>CMND/CCCD:</CFormLabel>
                        <p className="ms-1">{eligibilityDetail.ssn}</p>
                      </CCol>
                      <CCol sm="12">
                        <p>Hình CMND/CCCD:</p>
                        <LazyLoadImage alt="ssn" height={200} src={eligibilityDetail.ssnURL} />
                      </CCol>
                    </CRow>
                  ) : (
                    <CRow></CRow>
                  )}
                </CModalBody>
                <CModalFooter className="flex-center">
                  <CButton color="success" onClick={() => setRewardPopup(!rewardPopup)}>
                    Đóng
                  </CButton>
                </CModalFooter>
              </CModal>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Eligibilities
