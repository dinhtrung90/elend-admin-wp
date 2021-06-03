import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CLabel,
  CInput, CInvalidFeedback, CFormGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {userActions} from "../actions";
import {useTranslation} from "react-i18next";

const User = ({match}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.userDetail);

  const userDetails = user ? Object.entries(user) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  useEffect(() => {
    dispatch(userActions.getUserDetail(match.params.id));
  }, []);
  return (
    <CRow>
      <CCol lg={12}>
        <CForm>
          <CCard>
            <CCardHeader>
              {match.params.id ? 'Edit User' : 'New User'}
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="username">{t('view.User.Username')}</CLabel>
                <CInput id="username" name="username"/>
              </CFormGroup>
                {/*<table className="table table-striped table-hover">*/}
                {/*  <tbody>*/}
                {/*    {*/}
                {/*      userDetails.map(([key, value], index) => {*/}
                {/*        return (*/}
                {/*          <tr key={index.toString()}>*/}
                {/*            <td>{`${key}:`}</td>*/}
                {/*            <td><strong>{value}</strong></td>*/}
                {/*          </tr>*/}
                {/*        )*/}
                {/*      })*/}
                {/*    }*/}
                {/*  </tbody>*/}
                {/*</table>*/}
            </CCardBody>
          </CCard>
        </CForm>
      </CCol>
    </CRow>
  )
}

export default User
