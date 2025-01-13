import React from 'react'
export default function Navbar({ children }) {
    return (
        <header className='mb-2 mt-3 h-fit w-full rounded-lg border px-4 py-3'>
            <div className="flex gap-5">
                {children}
            </div>
        </header>
    )
}
