import { SxProps } from '@mui/material'
import React, { memo, useRef, useState, useEffect, ReactElement } from 'react'

export interface FileUploadProps {
  multiple?: boolean
  label?: string
  accept?: string | undefined
  buttonStyle?: SxProps
  value: any
  error?: string
  onChange: (e: any) => void
  render: (params: {
    inputComponent: JSX.Element
    field: {
      files: any
      isMultiple: boolean
      error?: string
      remove: (index: number) => () => void
    }
  }) => ReactElement
}

const FileUpload: React.FC<FileUploadProps> = (props) => {
  const { accept, value, multiple, onChange, error, render } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<any[]>([])
  const [helperText, setHelperText] = useState(error)

  useEffect(() => {
    setHelperText(error)
  }, [error])

  useEffect(() => {
    if (value) setFiles(Array.isArray(value) ? value : [value])
  }, [])

  const allowedFileTypes = accept ? accept.trim().split(/[,\s]+/i) : []
  const allowedTypes = allowedFileTypes.join(', ').toLocaleUpperCase()

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const localFiles = inputRef?.current?.files

    if (!localFiles) return

    setHelperText(undefined)

    const validFiles = Array.from(localFiles).filter(({ name }: File) => {
      if (accept == '*') return true
      return allowedFileTypes.some((type) => name.endsWith(type))
    })
    const invalid = localFiles.length - validFiles.length

    if (invalid != 0)
      setHelperText(
        `${invalid} file/s rejected. Only ${allowedTypes} are acceptable.`
      )

    if (!files || files.length == 0) {
      onChange && onChange(validFiles)
      setFiles(validFiles)
      e.currentTarget.value = ''
      return
    }

    const newFiles = [...validFiles, ...files]

    onChange && onChange(newFiles)
    setFiles(newFiles)
    e.currentTarget.value = ''
  }

  const removeCurrentFile = (fileIndex: number) => () => {
    setHelperText(undefined)

    const filtered =
      files?.filter((_, index: number) => index != fileIndex) || undefined
    onChange && onChange(filtered)
    setFiles(filtered)
  }

  if (files == null || files.length == 0) {
    return render({
      inputComponent: (
        <input
          ref={inputRef}
          hidden
          multiple={multiple}
          onChange={onInputChange}
          accept={accept}
          type="file"
        />
      ),
      field: {
        files: null,
        isMultiple: !!multiple,
        error: helperText,
        remove: removeCurrentFile,
      },
    })
  }

  return render({
    inputComponent: (
      <input
        ref={inputRef}
        hidden
        multiple={multiple}
        onChange={onInputChange}
        accept={accept}
        type="file"
      />
    ),
    field: {
      files,
      isMultiple: !!multiple,
      error: helperText,
      remove: removeCurrentFile,
    },
  })
}

FileUpload.defaultProps = {
  multiple: true,
  label: 'Upload',
  accept: '*',
}

export const isFile = (value: any) => {
  if (!value) return false

  return value instanceof File
}

export default memo(FileUpload)
