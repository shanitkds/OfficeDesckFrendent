import React from 'react'
import AllAttentanceView from '../../components/AllAttentanceView'
import AttentanceRequestView from '../../components/AttentanceRequestView'
import ManualAttentance from '../../components/ManualAttentance'
import FaceEntrolment from '../../components/FaceEntrolment'

function AttentanceManager() {
  return (
    <div>
        <AllAttentanceView/>
        <AttentanceRequestView/>
        <ManualAttentance/>
        <FaceEntrolment/>
    </div>
  )
}

export default AttentanceManager