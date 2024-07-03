import React from 'react'
import { useSelector } from 'react-redux'
import { appSelector } from '~/redux/slice/AppSlice'
import './index.css'
function Loading() {
  const loading = useSelector(appSelector.loading)
  if (!loading) return null
  return (
    <div className='overlay'>
      <div className='dot-spinner'>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
        <div className='dot-spinner__dot'></div>
      </div>
    </div>
  )
}

export default Loading
