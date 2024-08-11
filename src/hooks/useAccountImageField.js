import { useState, useEffect } from 'react'

import { useDropzone } from 'react-dropzone'

const useAccountImageField = ({ authUser }) => {
  const [image, setImage] = useState(null)
  const [deletedImage, setDeletedImage] = useState(false)

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: (acceptedFiles) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(Object.assign(acceptedFiles[0], { file: e.target.result }))
      }
      reader.readAsDataURL(acceptedFiles[0])
    },
    accept: 'image/jpeg, image/png',
    noClick: true,
    noKeyboard: true,
    noDrag: true,
    multiple: false,
  })

  const handleDeleteImage = () => {
    setImage(null)
    setDeletedImage(true)
  }

  useEffect(() => {
    if (authUser && authUser.image && authUser.image.file) {
      setImage(authUser.image)
    }
  }, [authUser])

  return {
    getRootProps,
    getInputProps,
    image,
    deletedImage,
    open,
    handleDeleteImage,
  }
}

export default useAccountImageField
