import React from 'react'
import TasksViewList from '../../components/TasksViewList'
import { useParams } from 'react-router-dom';

function TeamLeadTaskViewList() {
    const {Id} = useParams();
    return (
        <div>
            <TasksViewList employeeId={Id} />
        </div>
    )
}

export default TeamLeadTaskViewList