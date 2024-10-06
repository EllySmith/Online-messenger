import React from 'react'
import { useTranslation } from 'react-i18next';

function ChannelMenu({handleRenameClick, handleDeleteClick, buttonClass}) {
  const { t } = useTranslation();
  return (
     (
          <>
            <button
              type="button"
              id="menu"
              className={`flex-grow-0 dropdown-toggle dropdown-toggle-split ${buttonClass}`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <label className="visually-hidden" htmlFor='menu'>Управление каналом</label>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" id='rename' onClick={handleRenameClick}>
                {t('modals.rename')}
                </button>
                <label className="visually-hidden" htmlFor='rename'>Переименовать</label>
              </li>
              <li>
                <button className="dropdown-item text-danger" id='delete' onClick={handleDeleteClick}>
                {t('modals.delete')}
                </button>
                <label className="visually-hidden" htmlFor='delete'>Удалить</label>
              </li>
            </ul>
          </>
        )
  )
}

export default ChannelMenu
