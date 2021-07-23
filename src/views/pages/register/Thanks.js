import React from 'react'
import { CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'
import PropTypes from 'prop-types'

const Thanks = ({ match }) => {
  const rewardCode = match.params.id || ''
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
          <CCol md="9" lg="9" xl="8">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CRow>
                  <CCol sm="12" className="text-center">
                    <h4>Chúc mừng! Bạn đã đăng ký nhận quà Covid-19 thành công!</h4>
                    <div style={{ display: !rewardCode || rewardCode === 0 ? 'none' : 'block' }}>
                      <p>Mã đổi quà</p>
                      <h2>{rewardCode}</h2>
                      <p>Quý khách lưu ý mã code và xuất trình khi đến nhận quà.</p>
                      <small>Chú ý: mã này chỉ có hiệu lực trong vòng 30 ngày</small>
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

Thanks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}

export default Thanks
