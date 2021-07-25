import React, { useRef } from 'react'
import PropTypes from 'prop-types'

const FileUploader = ({ invalid, onFileSelectError, onFileSelectSuccess }) => {
  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files[0]
    const fileSize = file.size / 1024 / 1024 // in MiB
    if (fileSize > 10) onFileSelectError({ error: 'Hình ảnh lớn hơn 10MB' })
    else onFileSelectSuccess(file)
  }

  return (
    <div className="file-uploader">
      <input
        type="file"
        accept="image/*"
        className={`form-control ${invalid ? 'is-invalid' : ''}`}
        onChange={handleFileInput}
      />
    </div>
  )
}

FileUploader.propTypes = {
  invalid: PropTypes.bool,
  onFileSelectError: PropTypes.func,
  onFileSelectSuccess: PropTypes.func,
}

export default FileUploader
