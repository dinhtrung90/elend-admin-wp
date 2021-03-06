import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CCol, CRow, CButton } from '@coreui/react'
import { FaExchangeAlt } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const WidgetDragDrop = (props) => {
  const { t } = useTranslation()

  const { dataSource, onFinish } = props

  const [defaultRoles, setDefaultRoles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const roleEnum = {
    ROLE_SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_SUPERVISOR: 'ROLE_SUPERVISOR',
    ROLE_USER: 'ROLE_USER',
  }

  const categoryEnum = {
    availableRoles: 'availableRoles',
    effectiveRoles: 'effectiveRoles',
  }

  useEffect(() => {
    setDefaultRoles(dataSource)
  }, [dataSource])

  const assignEffectiveRole = (selectedRole, newCategory) => {
    switch (selectedRole.name) {
      case roleEnum.ROLE_SUPER_ADMIN:
        defaultRoles.forEach((role) => {
          role.category = newCategory
          role.selected = false
        })
        break
      case roleEnum.ROLE_ADMIN:
        defaultRoles.forEach((role) => {
          if (role.name === roleEnum.ROLE_SUPER_ADMIN) return
          role.category = newCategory
          role.selected = false
        })
        break
      case roleEnum.ROLE_SUPERVISOR:
        defaultRoles.forEach((role) => {
          if (role.name === roleEnum.ROLE_SUPER_ADMIN || role.name === roleEnum.ROLE_ADMIN) return
          role.category = newCategory
          role.selected = false
        })
        break
      default:
        defaultRoles.forEach((role) => {
          if (role.name !== selectedRole.name) return
          role.category = newCategory
          role.selected = false
        })
        break
    }
  }

  // init drag roles
  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData('id', id)
  }

  const onDragOver = (ev) => {
    ev.preventDefault()
  }

  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData('id')

    let roles = defaultRoles.filter((role) => {
      if (role.name === id) {
        assignEffectiveRole(role, cat)
      }
      return role
    })

    setDefaultRoles(roles)
    handleOnDropCompleted(
      defaultRoles.filter((role) => role.category === categoryEnum.effectiveRoles),
    )
  }

  const handleOnDropCompleted = (selectedRoles) => {
    onFinish(
      selectedRoles.map((r) => {
        return { name: r.name }
      }),
    )
  }

  const onFocusRole = (ev, item) => {
    defaultRoles.forEach((r) => {
      if (r.name === item.name) {
        r.selected = true
        ev.currentTarget.classList.add('selected')
      } else {
        r.selected = false
      }
    })
    setDefaultRoles(defaultRoles)
  }

  const onBlur = (ev) => {
    ev.currentTarget.classList.remove('selected')
  }

  const handleToSwitchRole = (ev) => {
    setIsLoading(true)
    defaultRoles.forEach((role) => {
      if (role.selected && role.category === categoryEnum.availableRoles) {
        assignEffectiveRole(role, categoryEnum.effectiveRoles)
      }
    })
    setDefaultRoles(defaultRoles)
    setTimeout(() => {
      setIsLoading(false)
      handleOnDropCompleted(
        defaultRoles.filter((role) => role.category === categoryEnum.effectiveRoles),
      )
    }, 200)
  }

  return (
    <CRow className="mt-4 role-container-drag">
      <CCol
        className="available-role"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => {
          onDrop(e, categoryEnum.availableRoles)
        }}
      >
        <span className="drag-role-header font-weight-bold">
          {t('view.UserRole.AvailableRoles')}
        </span>
        <div className="drag-role-list">
          {!isLoading &&
            defaultRoles.map((t) => {
              return t.category === categoryEnum.availableRoles ? (
                <div
                  key={t.name}
                  onDragStart={(e) => onDragStart(e, t.name)}
                  draggable
                  onFocus={(e) => onFocusRole(e, t)}
                  onBlur={(e) => onBlur(e)}
                  className={t.selected ? 'draggable selected' : 'draggable'}
                  tabIndex="0"
                >
                  {t.name}
                </div>
              ) : null
            })}
        </div>
        <CButton color="primary mt-3" onClick={(e) => handleToSwitchRole(e)}>
          {t('common.AddSelected')}
        </CButton>
      </CCol>
      <FaExchangeAlt className="drag-icon" />
      <CCol
        className="droppable"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, categoryEnum.effectiveRoles)}
      >
        <span className="drag-role-header font-weight-bold">
          {t('view.UserRole.EffectiveRoles')}
        </span>
        <div className="drag-role-list">
          {!isLoading &&
            defaultRoles.map((t) => {
              return t.category === categoryEnum.effectiveRoles ? (
                <div
                  key={t.name}
                  onDragStart={(e) => onDragStart(e, t.name)}
                  draggable
                  onFocus={(e) => onFocusRole(e, t)}
                  onBlur={(e) => onBlur(e)}
                  className={t.selected ? 'draggable selected' : 'draggable'}
                  tabIndex="0"
                >
                  {t.name}
                </div>
              ) : null
            })}
        </div>
        <CButton color="secondary mt-3" onClick={(e) => handleToSwitchRole(e)}>
          {t('common.RemoveSelected')}
        </CButton>
      </CCol>
    </CRow>
  )
}

WidgetDragDrop.propTypes = {
  dataSource: PropTypes.array.isRequired,
  onFinish: PropTypes.func,
}

export default WidgetDragDrop
