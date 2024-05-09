import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react'
import { fabric } from 'fabric'

const FlowerContext = createContext()

export const useFlower = () => useContext(FlowerContext)

export const FlowerProvider = ({ children }) => {
  const canvasRef = useRef(null)
  const tempObjectRef = useRef(null)
  const [isAdding, setIsAdding] = useState(false)
  const [imagesInfo, setImagesInfo] = useState([])

  const [cardInfo, setCardInfo] = useState({
    product_id: '',
    content: '',
    card_url: '',
    product_price: 0,
    product_name: '',
  })
  const [packageInfo, setPackageInfo] = useState({
    product_id: '',
    package_name: '',
    package_url: '',
    product_price: 0,
    product_category: '',
  })

  const [previewStyle, setPreviewStyle] = useState(null)
  const [confirmedStyle, setConfirmedStyle] = useState(null)
  useEffect(() => {
    if (canvasRef.current && !canvasRef.current.fabric) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current)
      canvasRef.current.fabric = fabricCanvas
      setupCustomControls(fabricCanvas)
    }
  }, [])

  // const addImageToCanvas = useCallback((url, metadata) => {
  //   if (!canvasRef.current || !canvasRef.current.fabric) {
  //     console.error('Canvas is not initialized.')
  //     return
  //   }

  //   const canvas = canvasRef.current.fabric

  //   if (tempObjectRef.current) {
  //     canvas.remove(tempObjectRef.current)
  //     tempObjectRef.current = null
  //   }

  //   new fabric.Image.fromURL(url, (img) => {
  //     if (!img) {
  //       console.error('Failed to load image')
  //       return
  //     }
  //     const clipBounds = canvas.clipPath.getBoundingRect()
  //     img.set({
  //       ...metadata,
  //       id: metadata.id || fabric.util.getRandomInt(1000, 9999),
  //       zIndex: metadata.zIndex || 1,
  //       left:
  //         metadata.left !== undefined
  //           ? metadata.left
  //           : clipBounds.left + clipBounds.width / 2,
  //       top:
  //         metadata.top !== undefined
  //           ? metadata.top
  //           : clipBounds.top + clipBounds.height / 2,
  //       scaleX: metadata.scaleX !== undefined ? metadata.scaleX : 0.5,
  //       scaleY: metadata.scaleY !== undefined ? metadata.scaleY : 0.5,
  //       originX: 'center',
  //       originY: 'center',
  //       lockScalingX:
  //         metadata.lockScalingX !== undefined ? metadata.lockScalingX : true,
  //       lockScalingY:
  //         metadata.lockScalingY !== undefined ? metadata.lockScalingY : true,
  //     })

  //     canvas.add(img)
  //     canvas.setActiveObject(img)
  //     canvas.renderAll()
  //     tempObjectRef.current = img
  //   })
  // }, [])
  // const addImageToCanvas = useCallback((url, metadata) => {
  //   if (!canvasRef.current || !canvasRef.current.fabric) {
  //     console.error('Canvas is not initialized.')
  //     return
  //   }

  //   const canvas = canvasRef.current.fabric
  //   // if (!canvas.clipPath) {
  //   //   console.error('Clip path is not set.')
  //   //   return // 或者設置一個默認 clipPath，視需求而定
  //   // }

  //   // const clipBounds = canvas.clipPath.getBoundingRect() ||canvas.clipPath.getBoundingRect() || 0
  //   const clipBounds = 0

  //   new fabric.Image.fromURL(url, (img) => {
  //     if (!img) {
  //       console.error('Failed to load image')
  //       return
  //     }

  //     img.set({
  //       ...metadata,
  //       id: metadata.id || fabric.util.getRandomInt(1000, 9999),
  //       product_id: metadata.product_id,
  //       zIndex: metadata.zIndex || 1,
  //       left:
  //         metadata.left !== undefined
  //           ? metadata.left
  //           : clipBounds.left + clipBounds.width / 2,
  //       top:
  //         metadata.top !== undefined
  //           ? metadata.top
  //           : clipBounds.top + clipBounds.height / 2,
  //       scaleX: metadata.scaleX !== undefined ? metadata.scaleX : 0.5,
  //       scaleY: metadata.scaleY !== undefined ? metadata.scaleY : 0.5,
  //       originX: 'center',
  //       originY: 'center',
  //       angle: metadata.angle !== undefined ? metadata.angle : 0,
  //       url: metadata.url,
  //       lockScalingX:
  //         metadata.lockScalingX !== undefined ? metadata.lockScalingX : true,
  //       lockScalingY:
  //         metadata.lockScalingY !== undefined ? metadata.lockScalingY : true,
  //     })

  //     canvas.add(img)
  //     canvas.setActiveObject(img)
  //     canvas.renderAll()
  //     tempObjectRef.current = img
  //   })
  // }, [])
  // const addImageToCanvas = useCallback(
  //   (url, metadata) => {
  //     if (!canvasRef.current || !canvasRef.current.fabric) {
  //       console.error('Canvas is not initialized.')
  //       return
  //     }

  //     // 如果已有正在处理的图像，先移除
  //     if (tempObjectRef.current) {
  //       canvasRef.current.fabric.remove(tempObjectRef.current)
  //       tempObjectRef.current = null
  //     }

  //     // 标记正在加载图像
  //     if (tempObjectRef.isLoading) {
  //       console.log('Image is already loading, please wait.')
  //       return // 如果当前有图像正在加载，则不进行新的加载
  //     }
  //     tempObjectRef.isLoading = true

  //     new fabric.Image.fromURL(url, (img) => {
  //       tempObjectRef.isLoading = false // 加载完成后清除加载标志

  //       if (!img) {
  //         console.error('Failed to load image')
  //         return
  //       }

  //       const canvas = canvasRef.current.fabric
  //       const centerX = canvas.width / 2
  //       const centerY = canvas.height / 4

  //       const newId = metadata.id || fabric.util.getRandomInt(1000, 9999)
  //       img.set({
  //         ...metadata,
  //         id: newId,
  //         product_id: metadata.product_id,
  //         zIndex: metadata.zIndex || 1,
  //         left: metadata.left !== undefined ? metadata.left : centerX,
  //         top: metadata.top !== undefined ? metadata.top : centerY,
  //         scaleX: metadata.scaleX !== undefined ? metadata.scaleX : 0.5,
  //         scaleY: metadata.scaleY !== undefined ? metadata.scaleY : 0.5,
  //         originX: 'center',
  //         originY: 'center',
  //         angle: metadata.angle !== undefined ? metadata.angle : 0,
  //         url: metadata.url,
  //         lockScalingX:
  //           metadata.lockScalingX !== undefined ? metadata.lockScalingX : true,
  //         lockScalingY:
  //           metadata.lockScalingY !== undefined ? metadata.lockScalingY : true,
  //       })
  //       canvas.add(img)
  //       canvas.setActiveObject(img)
  //       canvas.renderAll()
  //       tempObjectRef.current = img
  //     })
  //   },
  //   [canvasRef]
  // )

  const addImageToCanvas = useCallback(
    (url, metadata, autoCommit = false) => {
      if (!canvasRef.current || !canvasRef.current.fabric) {
        console.error('Canvas is not initialized.')
        return
      }

      if (!metadata.id && tempObjectRef.current) {
        canvasRef.current.fabric.remove(tempObjectRef.current)
        tempObjectRef.current = null
      }

      if (isAdding) return
      setIsAdding(true)

      new fabric.Image.fromURL(url, (img) => {
        setIsAdding(false)
        if (!img) {
          console.error('Failed to load image')
          return
        }

        const canvas = canvasRef.current.fabric
        const centerX = canvas.width / 2
        const centerY = canvas.height / 4
        const newId = `img_${Date.now()}_${Math.random().toString(16).slice(2)}`
        img.set({
          ...metadata,
          id: metadata.id || newId,
          product_id: metadata.product_id,
          product_category: metadata.product_category,
          product_price: metadata.product_price,
          zIndex: metadata.zIndex || 1,
          left: metadata.left !== undefined ? metadata.left : centerX,
          top: metadata.top !== undefined ? metadata.top : centerY,
          scaleX: metadata.scaleX !== undefined ? metadata.scaleX : 0.5,
          scaleY: metadata.scaleY !== undefined ? metadata.scaleY : 0.5,
          originX: 'center',
          originY: 'center',
          angle: metadata.angle !== undefined ? metadata.angle : 0,
          url: metadata.url,
          lockScalingX:
            metadata.lockScalingX !== undefined ? metadata.lockScalingX : true,
          lockScalingY:
            metadata.lockScalingY !== undefined ? metadata.lockScalingY : true,
        })

        canvas.add(img)
        canvas.setActiveObject(img)
        canvas.renderAll()

        if (!metadata.id) {
          tempObjectRef.current = img
        }
        if (autoCommit) {
          commitImageToCanvas(img)
        }
      })
    },
    [canvasRef, isAdding]
  )

  const commitImageToCanvas = useCallback(() => {
    if (tempObjectRef.current) {
      const img = tempObjectRef.current
      const canvas = canvasRef.current.fabric

      const imgInfo = {
        id: img.id,
        product_id: img.product_id,
        product_category: img.product_category,
        product_price: img.product_price,
        url: img.url,
        left: img.left - canvas.width / 2,
        top: img.top - canvas.height / 4,
        name: img.name || img.product_name,
        color: img.color,
        zIndex: img.zIndex,
        angle: img.angle,
        scaleX: img.scaleX,
        scaleY: img.scaleY,
        locked: false,
      }

      setImagesInfo((prev) => {
        const index = prev.findIndex((info) => info.id === img.id)
        if (index > -1) {
          const newImagesInfo = [...prev]
          newImagesInfo[index] = imgInfo
          return newImagesInfo
        }
        return [...prev, imgInfo]
      })

      tempObjectRef.current = null
    }
  }, [])

  const setupCustomControls = (canvas) => {
    const rotateIcon = new Image()
    rotateIcon.onload = () => {
      fabric.Object.prototype.controls.mtr = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -10,
        offsetX: 10,
        cursorStyle: 'pointer',
        actionHandler: fabric.controlsUtils.rotationWithSnapping,
        render: (ctx, left, top, styleOverride, fabricObject) => {
          const size = fabricObject.cornerSize
          ctx.save()

          ctx.translate(left, top)
          ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
          ctx.drawImage(rotateIcon, -size / 2, -size / 2, size, size)
          ctx.restore()
        },
        cornerSize: 24,
      })
    }
    rotateIcon.src = '/custom/custom/rotateIcon.png'
    fabric.Object.prototype.hasControls = true
    fabric.Object.prototype.hasBorders = false
    fabric.Object.prototype.borderColor = 'transparent'
    fabric.Object.prototype.borderScaleFactor = 1.2
    fabric.Object.prototype.borderDashArray = [10, 5]

    // Hide other controls
    ;['tl', 'tr', 'bl', 'br', 'mt', 'mb', 'ml', 'mr'].forEach((ctrl) => {
      fabric.Object.prototype.controls[ctrl].visible = false
    })
  }

  // const removeCurrentImage = useCallback(() => {
  //   if (
  //     !canvasRef.current ||
  //     !canvasRef.current.fabric ||
  //     !tempObjectRef.current
  //   )
  //     return

  //   const canvas = canvasRef.current.fabric
  //   canvas.remove(tempObjectRef.current)
  //   tempObjectRef.current = null
  // }, [])
  const removeCurrentImage = () => {
    const canvas = canvasRef.current?.fabric // 確保你有正確訪問到 fabric 的 canvas 實例
    if (tempObjectRef.current && canvas) {
      canvas.remove(tempObjectRef.current) // 從畫布移除該物件
      canvas.requestRenderAll() // 刷新畫布以更新顯示
      tempObjectRef.current = null // 清空暫存引用，避免重複移除
    }
  }

  const clearObjectsOnCanvas = useCallback(() => {
    const canvas = canvasRef.current?.fabric
    if (canvas) {
      const objects = canvas.getObjects()

      objects.forEach((obj) => {
        canvas.remove(obj)
      })

      setImagesInfo([])
    }
  }, [canvasRef, setImagesInfo])

  const snapshotCanvas = useCallback(() => {
    let canvas = canvasRef.current?.fabric
    if (canvas) {
      canvas.discardActiveObject()
      canvas.renderAll()
    }
    return canvas ? canvas.toDataURL({ format: 'png', quality: 0.8 }) : null
  }, [])

  const getClipBounds = useCallback(() => {
    if (
      canvasRef.current &&
      canvasRef.current.fabric &&
      canvasRef.current.fabric.clipPath
    ) {
      return canvasRef.current.fabric.clipPath.getBoundingRect()
    }
    return null
  }, [])

  return (
    <FlowerContext.Provider
      value={{
        addImageToCanvas,
        commitImageToCanvas,
        removeCurrentImage,
        clearObjectsOnCanvas,
        snapshotCanvas,
        setupCustomControls,
        setImagesInfo,
        canvasRef,
        imagesInfo,
        getClipBounds,
        tempObjectRef,
        cardInfo,
        setCardInfo,
        packageInfo,
        setPackageInfo,
        previewStyle,
        setPreviewStyle,
        confirmedStyle,
        setConfirmedStyle,
      }}
    >
      {children}
    </FlowerContext.Provider>
  )
}
