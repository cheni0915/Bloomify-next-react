export default function CenterLayout({ children, activePage }) {
  return (
    <>
      {/* 置中 & 背景色 */}
      <main className="flex flex-col justify-center items-center bg-white mt-[64px]">
        {/* 主要容器 */}
        <div className="bg-white container justify-center flex flex-col items-center columns-12 px-5 mt-10 md:mt-0 mb-12 md:mb-20 md:px-0 my-4">
          {children}
        </div>
      </main>
    </>
  )
}
