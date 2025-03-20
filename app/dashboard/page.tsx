import React from 'react'

const page = () => {
  return (
    <div className='w-full h-dvh p-24'>
      Dashboard
      <main className='flex justify-center gap-16 h-dvh w-full m-auto text-white'>
        <aside className='bg-sidebar-accent-foreground w-1/2'>Likes</aside>
        <aside className='bg-accent-foreground w-1/2'>Comments</aside>
      </main>
    </div>
  )
}

export default page
