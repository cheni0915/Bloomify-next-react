import { useState } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Tabs, Tab, Card } from '@nextui-org/react'

// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Sidebar from '@/components/layout/sidebar'
import Title from '@/components/common/title'
import Head from 'next/head'

import OrderCard from '@/components/shop/order-card'

export default function CenterShop() {
  const [activePage, setActivePage] = useState('shop')

  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <Head>
            <title>商品訂單</title>
          </Head>
          <CenterLayout>
            {/* 麵包屑 */}
            <div className="hidden sm:block w-full py-6">
              <Breadcrumbs>
                <BreadcrumbItem>首頁</BreadcrumbItem>
                <BreadcrumbItem>會員中心</BreadcrumbItem>
                <BreadcrumbItem>線上商城</BreadcrumbItem>
                <BreadcrumbItem>商品訂單</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            {/* 主要內容 */}
            <div className="flex flex-row w-full justify-center mt-10 sm:mt-0">
              {/* 側邊欄 */}
              <Sidebar />

              <div className="w-10/12 lg:w-10/12 pl-0 md:pl-10">
                <Title text="商品訂單" />
                <div className="flex w-full flex-col">
                  <Tabs
                    key={''}
                    radius={'full'}
                    color={'primary'}
                    aria-label="Tabs radius"
                    className="pt-4"
                  >
                    <Tab key="all" title="全部訂單">
                      <div className="flex flex-col gap-4">
                        <OrderCard filterStatus={['處理中', '已完成']} />
                      </div>
                    </Tab>
                    <Tab key="unfinished" title="未完成">
                      <div className="flex flex-col gap-4">
                        <OrderCard filterStatus="處理中" />
                      </div>
                    </Tab>
                    <Tab key="finished" title="已完成">
                      <div className="flex flex-col gap-4">
                        <OrderCard filterStatus="已完成" />
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </CenterLayout>
        </>
      }
    </DefaultLayout>
  )
}
