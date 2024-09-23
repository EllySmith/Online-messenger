import React, {useState} from 'react'

function RenameModal({handleCancel, handleRename}) {
 const [newName, setNewName] = useState('');

  return (
    <div>
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <p>Введите новое имя:</p>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Отменить
                </button>
                <button type="button" className="btn btn-danger" onClick={handleRename}>
                  Изменить
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default RenameModal
