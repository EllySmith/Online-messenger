import React from 'react'

function ChannelMenu({handleRenameClick, handleDeleteClick, buttonClass}) {
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
                  Переименовать
                </button>
              </li>
              <li>
                <button className="dropdown-item text-danger" onClick={handleDeleteClick}>
                  Удалить
                </button>
              </li>
            </ul>
          </>
        )
  )
}

export default ChannelMenu
