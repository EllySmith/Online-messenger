import React from 'react'

function DeleteModal({handleCancel, handleDelete}) {
  return (
    <div>
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <p>Удалить канал?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Нет
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Да
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DeleteModal
