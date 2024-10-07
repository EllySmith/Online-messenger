import React from 'react';
import { useTranslation } from 'react-i18next';

const ChannelMenu = ({ handleRenameClick, handleDeleteClick, buttonClass }) => {
  const { t } = useTranslation();
  return (
    <>
      <button
        type="button"
        id="menu"
        className={`flex-grow-0 dropdown-toggle dropdown-toggle-split ${buttonClass}`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="visually-hidden" htmlFor="menu">
          Управление каналом
        </span>
      </button>
      <ul className="dropdown-menu">
        <li>
        <label className="visually-hidden" htmlFor="rename">
            Переименовать
          </label>
          <button
            type="button"
            className="dropdown-item"
            id="rename"
            onClick={handleRenameClick}
          >
            {t('modals.rename')}
          </button>
        </li>
        <li>
        <label className="visually-hidden" htmlFor="delete">
            Удалить
          </label>
          <button
            type="button"
            className="dropdown-item text-danger"
            id="delete"
            onClick={handleDeleteClick}
          >
            {t('modals.delete')}
          </button>
        </li>
      </ul>
    </>
  );
};

export default ChannelMenu;
