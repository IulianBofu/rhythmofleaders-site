import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-8">
      <div className="text-5xl font-semibold">404</div>
      <div className="text-slate-600">Page not found</div>
      <Link className="underline" to="/">Go home</Link>
    </div>
  )
}
