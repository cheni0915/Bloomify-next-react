import { useState } from 'react'
import SwiperCarousel from './SwiperCarousel'
import CardStyleSelector from './CardStyleSelector'
export default function GiftCardContent({ items }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const handleSelectItem = (attributes, categoryName) => {
    if (attributes && attributes.length > 0) {
      setSelectedItem({ attributes, categoryName })
    }
  }

  const defaultCard = {
    category_name: '不加購卡片',
    category_url: '/custom/custom/noAdd.png',
  }

  items = [defaultCard, ...items]

  return (
    <>
      {selectedItem ? (
        <CardStyleSelector
          itemAttribute={selectedItem.attributes}
          categoryName={selectedItem.categoryName}
          onConfirm={() => {
            setSelectedItem(null)
          }}
        />
      ) : (
        <div className="text-tertiary-black w-full h-full flex flex-col justify-center items-center">
          <div className="text-tertiary-gray-100 w-60 text-center py-4">
            <p className="text-xs">請選擇您喜歡的卡片。</p>
          </div>
          <SwiperCarousel items={items} onItemSelect={handleSelectItem} />
        </div>
      )}
    </>
  )
}
