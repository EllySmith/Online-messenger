import React from 'react'
import { useTranslation } from 'react-i18next';

function ChannelMenu({handleRenameClick, handleDeleteClick, buttonClass}) {
  const { t } = useTranslation();
  return (
     (
          <>
            <button
              type="button"
              className={`flex-grow-0 dropdown-toggle dropdown-toggle-split ${buttonClass}`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={handleRenameClick}>
                {t('modals.rename')}
                </button>
              </li>
              <li>
                <button className="dropdown-item text-danger" onClick={handleDeleteClick}>
                {t('modals.delete')}
                </button>
              </li>
            </ul>
          </>
        )
  )
}

export default ChannelMenu
