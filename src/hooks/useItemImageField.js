import { useState, useEffect, useCallback } from 'react'

import arrayMove from 'array-move'
import some from 'lodash.some'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

import api from '@/lib/api'

const useItemImageField = ({ presetImages, maxImageLength = 10 }) => {
  const [images, setImages] = useState(presetImages)
  const [deletedImages, setDeletedImages] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  const disabled = images.length >= maxImageLength

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const canUploadImageLength = maxImageLength - images.length

      if (canUploadImageLength < 1) {
        return
      }

      if (canUploadImageLength < acceptedFiles.length) {
        acceptedFiles.splice(canUploadImageLength, acceptedFiles.length)
      }

      acceptedFiles.map(async (file) => {
        setIsUploading(true)

        const temp_id = uuidv4()

        setImages((prevState) => [
          ...prevState,
          {
            temp_id,
            file: URL.createObjectURL(file),
            loading: true,
          },
        ])

        let formData = new FormData()
        formData.append('file', file)
        formData.append('temp_id', temp_id)

        try {
          const response = await api.post('classifieds/images/', formData)

          setImages((prevState) =>
            prevState.map((el) =>
              el.temp_id === response.data.temp_id
                ? { ...el, id: response.data.id, loading: false }
                : el
            )
          )
        } catch (error) {
          toast('エラーが発生しました')
        }
      })
    },
    [images, maxImageLength]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/jpeg, image/png',
    noDrag: true,
    disabled,
  })

  const handleDelete = (id) => {
    setImages(images.filter((el) => el.id !== id))
    setDeletedImages([...deletedImages, id])
  }

  const handleSortEnd = (oldIndex, newIndex) => {
    setImages((array) => arrayMove(array, oldIndex, newIndex))
  }

  useEffect(() => {
    images.forEach((image) => URL.revokeObjectURL(image.file))
  }, [setImages, images])

  useEffect(() => {
    if (images.length) {
      if (!some(images, { loading: true })) setIsUploading(false)
    }
  }, [images])

  return {
    images,
    getRootProps,
    getInputProps,
    disabled,
    deletedImages,
    handleDelete,
    handleSortEnd,
    isUploading,
  }
}

export default useItemImageField
