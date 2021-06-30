import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {
  CCol,
  CRow,
  CButton
} from '@coreui/react';
import {FaExchangeAlt} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const WidgetDragDrop = props => {
  const { t } = useTranslation();

  const {
    dataSource,
    onFinish,
    ...attributes
  } = props
  const [defaultRoles, setDefaultRoles] = useState(dataSource);
  const [isLoading, setIsLoading] = useState(false);

  const roleEnum = {
    ROLE_SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_SUPERVISOR: 'ROLE_SUPERVISOR',
    ROLE_USER: 'ROLE_USER'
  }

  const categoryEnum = {
    availableRoles: 'availableRoles',
    effectiveRoles: 'effectiveRoles'
  }

  // init drag roles
  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  }

  const onDragOver = (ev) => {
    ev.preventDefault();
  }

  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");

    let roles = defaultRoles.filter((role) => {
      if (role.name === id) {
        assignEffectiveRole(role, cat);
      }
      return role;
    });

    setDefaultRoles(roles);
    onFinish(defaultRoles.filter(role => role.category === categoryEnum.effectiveRoles));
  }

  const onFocusRole = (ev, item) => {
    defaultRoles.forEach(r => {
      if (r.name === item.name) {
        r.selected = true;
        ev.currentTarget.classList.add('selected')
      } else {
        r.selected = false;
      }
    });
    setDefaultRoles(defaultRoles);
  }

  const onBlur = (ev) => {
    ev.currentTarget.classList.remove('selected');
  }

  const assignEffectiveRole = (selectedRole, newCategory) => {
    switch (selectedRole.name){
      case roleEnum.ROLE_SUPER_ADMIN:
        defaultRoles.forEach(role => {
          role.category = newCategory;
          role.selected = false;
        });
        break;
      case roleEnum.ROLE_ADMIN:
        defaultRoles.forEach(role => {
          if (role.name === roleEnum.ROLE_SUPER_ADMIN)return;
          role.category = newCategory;
          role.selected = false;
        })
        break;
      case roleEnum.ROLE_SUPERVISOR:
        defaultRoles.forEach(role => {
          if (role.name === roleEnum.ROLE_SUPER_ADMIN || role.name === roleEnum.ROLE_ADMIN)return;
          role.category = newCategory;
          role.selected = false;
        });
        break;
      default:
        selectedRole.category = newCategory;
        selectedRole.selected = false;
        break;
    }
  }

  const handleAddSelectedRole = (ev) => {
    setIsLoading(true);
    defaultRoles.filter(role => {
      if (role.selected && role.category === categoryEnum.availableRoles) {
        assignEffectiveRole(role, categoryEnum.effectiveRoles);
      }
    })
    setDefaultRoles(defaultRoles);
    setTimeout(() => {
      setIsLoading(false);
      onFinish(defaultRoles.filter(role => role.category === categoryEnum.effectiveRoles));
    }, 200);
  }

  const handleRemoveSelectedRole = (ev) => {
    setIsLoading(true);
    defaultRoles.filter(role => {
      if (role.selected && role.category === categoryEnum.effectiveRoles) {
        assignEffectiveRole(role, categoryEnum.availableRoles)
      }
    })
    setDefaultRoles(defaultRoles);
    setTimeout(() => {
      setIsLoading(false);
      onFinish(defaultRoles.filter(role => role.category === categoryEnum.effectiveRoles));
    }, 200);
  }

  return (
    <CRow className="mt-4 role-container-drag">
      <CCol className="available-role"
            onDragOver={(e)=>onDragOver(e)}
            onDrop={(e)=>{onDrop(e, categoryEnum.availableRoles)}}>
        <span className="drag-role-header font-weight-bold">{t('view.UserRole.AvailableRoles')}</span>
        <div className="drag-role-list">
          {!isLoading && defaultRoles.map(t => {
            return t.category === categoryEnum.availableRoles ? (
                <div key={t.name}
                     onDragStart = {(e) => onDragStart(e, t.name)}
                     draggable
                     onFocus={(e) => onFocusRole(e, t)}
                     onBlur={(e) => onBlur(e)}
                     className={t.selected ? 'draggable selected' : 'draggable'}
                     tabIndex="0"
                >
                  {t.name}
                </div>
            ) : null
          })
          }
        </div>
        <CButton color="primary mt-3" onClick={(e) => handleAddSelectedRole(e)}>{t('common.AddSelected')}</CButton>
      </CCol>
      <FaExchangeAlt className="drag-icon"/>
      <CCol className="droppable"
            onDragOver={(e)=>onDragOver(e)}
            onDrop={(e)=>onDrop(e, categoryEnum.effectiveRoles)}>
        <span className="drag-role-header font-weight-bold">{t('view.UserRole.EffectiveRoles')}</span>
        <div className="drag-role-list">
          {!isLoading && defaultRoles.map(t => {
            return t.category === categoryEnum.effectiveRoles ? (
                <div key={t.name}
                     onDragStart = {(e) => onDragStart(e, t.name)}
                     draggable
                     onFocus={(e) => onFocusRole(e, t)}
                     onBlur={(e) => onBlur(e)}
                     className={t.selected ? 'draggable selected' : 'draggable'}
                     tabIndex="0"
                >
                  {t.name}
                </div>
            ) : null
          })
          }
        </div>
        <CButton color="secondary mt-3" onClick={(e) => handleRemoveSelectedRole(e)}>{t('common.RemoveSelected')}</CButton>
      </CCol>
    </CRow>
  )
}

WidgetDragDrop.propTypes = {
  dataSource: PropTypes.array.isRequired,
  onFinish: PropTypes.func
}

export default WidgetDragDrop;