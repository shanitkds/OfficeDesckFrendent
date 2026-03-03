import React from 'react'
import HrAdEmployeeTaskReport from '../../components/HrAdEmployeeTaskReport'
import { useParams } from 'react-router-dom';

function HrTaskReport() {
    const { Id } = useParams();
  return (
    <div>
        <HrAdEmployeeTaskReport employeeId={Id}/>
    </div>
  )
}

export default HrTaskReport