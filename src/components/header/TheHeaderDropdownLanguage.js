import React from 'react'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { useTranslation } from 'react-i18next'

const TheHeaderDropdownLanguage = () => {
  const { i18n } = useTranslation()
  const languages = {
    en: 'English',
    vi: 'Tiếng Việt',
  }

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const getCurrentLanguage = () => {
    return languages[i18n.language]
  }
  return (
    <CDropdown className="c-header-nav-item mx-2" size="sm">
      <CDropdownToggle className="c-header-nav-link" caret>
        <span>{getCurrentLanguage()}</span>
      </CDropdownToggle>
      <CDropdownMenu className="p-0" placement="bottom-end">
        <CDropdownItem className="dropdown-lang-item" onClick={() => handleChangeLanguage('vi')}>
          {languages['vi']}
        </CDropdownItem>
        <CDropdownItem className="dropdown-lang-item" onClick={() => handleChangeLanguage('en')}>
          {languages['en']}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownLanguage
