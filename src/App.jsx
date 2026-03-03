import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AdminDashboard from './modules/or_admin/AdminDashboard';
import OrHome from './modules/or_admin/OrHome';
import UserManager from './modules/or_admin/UserManager';
import AddUser from './modules/or_admin/AddUser';
import UserUpdate from './modules/or_admin/UserUpdate';
import OradminTeamLeadAssine from './modules/or_admin/OradminTeamManagement';
import AttentanceManager from './modules/or_admin/AttentanceManager';
import AdminFileManage from './modules/or_admin/AdminFileManage';
import SalaryManagement from './modules/or_admin/AdminSalaryManagement';
import AdminSalaryManagement from './modules/or_admin/AdminSalaryManagement';
import AdminMyExpenses from './modules/or_admin/AdminMyExpenses';
import PerformenceView from './modules/or_admin/PerformenceView';
import AdminTaksReport from './modules/or_admin/AdminTaksReport';
import AdminTaksReportView from './modules/or_admin/AdminTaksReportView';
import TeamLeadDashboard from './modules/teamlead/TeamLeadDashboard';
import TeamLeadHome from './modules/teamlead/TeamLeadHome';
import TamLeadAttentance from './modules/teamlead/TamLeadAttentance'
import TeamLeadTasckAssine from './modules/teamlead/TeamLeadTasckAssine';
import TeamLeadTaskViewList from './modules/teamlead/TeamLeadTaskViewList';
import TeamLeadGetUniqTask from './modules/teamlead/TeamLeadGetUniqTask';
import TeamLeadFileManage from './modules/teamlead/TeamLeadFileManage';
import TeamLeadMyExpenses from './modules/teamlead/TeamLeadMyExpenses';
import TeamLeadPerformenceManager from './modules/teamlead/TeamLeadPerformenceManager';
import TeamLeadTeam from './modules/teamlead/TeamLeadTeam';
import TeamLeadMyAttentanceView from './modules/teamlead/TeamLeadMyAttentanceView';
import TeamLeadSalary from './modules/teamlead/TeamLeadSalary';
import EmployeeDashbord from './modules/employee/EmployeeDashbord';
import EmplyeeHome from './modules/employee/EmplyeeHome';
import EmployeeAttentance from './modules/employee/EmployeeAttentance';
import EmployeeFileManage from './modules/employee/EmployeeFileManage';
import EmployeeTaskManager from './modules/employee/EmployeeTaskManager';
import EpmplyeeTaskSubmition from './modules/employee/EpmplyeeTaskSubmition';
import EmployeeExpences from './modules/employee/EmployeeExpences';
import EmployeeMyTeam from './modules/employee/EmployeeMyTeam';
import EmployeeAttentanceHistory from './modules/employee/EmployeeAttentanceHistory';
import EmployeePaimentHistory from './modules/employee/EmployeePaimentHistory';
import EmployeePerformence from './modules/employee/EmployeePerformence';
import HrDashbord from './modules/hr/HrDashbord';
import HrHome from './modules/hr/HrHome';
import HrAttentanceMark from './modules/hr/HrAttentanceMark';
import HrManageAttentance from './modules/hr/HrManageAttentance';
import HrFileManager from './modules/hr/HrFileManager';
import HrPerformenceAnalyser from './modules/hr/HrPerformenceAnalyser';
import HrTaskReportEmplayView from './modules/hr/HrTaskReportEmplayView';
import HrTaskReport from './modules/hr/HrTaskReport';
import HrMyexpenses from './modules/hr/HrMyexpenses';
import HrMyAttentanceHistory from './modules/hr/HrMyAttentanceHistory';
import HrPaimentHistory from './modules/hr/HrPaimentHistory';
import HrUserManageMent from './modules/hr/HrUserManageMent';
import HrAddUserRequest from './modules/hr/HrAddUserRequest';
import HrUserUpdateRequest from './modules/hr/HrUserUpdateRequest';
import AccountentDashbord from './modules/accoundent/AccountentDashbord';
import AccountentHome from './modules/accoundent/AccountentHome';
import AccountentAttentance from './modules/accoundent/AccountentAttentance';
import AccountentMyExpences from './modules/accoundent/AccountentExpenceManager';
import AccountentPaimentHistory from './modules/accoundent/AccountentPaimentHistory';
import AccountentMyAttentance from './modules/accoundent/AccountentMyAttentance';
import AccountentExpenceManager from './modules/accoundent/AccountentExpenceManager';
import AccountentFileManager from './modules/accoundent/AccountentFileManager';
import AccountentSalaryManagement from './modules/accoundent/AccountentSalaryManagement';
import AccountentChat from './modules/accoundent/chat/AccountentChat';
import HrChat from './modules/hr/HrChat';
import EmployeeChact from './modules/employee/EmployeeChact';
import OrAdminChat from './modules/or_admin/OrAdminChat';
import SupperadminDashbord from './modules/supperadmin/SupperadminDashbord';
import SupperAdminHome from './modules/supperadmin/SupperAdminHome';
import OrganisationRequestPage from './pages/OrganisationRequestPage';
import SupperadminRequestView from './modules/supperadmin/SupperadminRequestView';
import TeamLeadChat from './modules/teamlead/TeamLeadChat';
import SupperAdminManageOrganisation from './modules/supperadmin/SupperAdminManageOrganisation';
import SupperAdminOrganisationDetails from './modules/supperadmin/SupperAdminOrganisationDetails';
import ResetPassword from './pages/ResetPassword';
import ForgotPassWordPage from './pages/ForgotPassWordPage';
import SupperAdminChath from './modules/supperadmin/SupperAdminChath';
import Or_adminProfile from './modules/or_admin/Or_adminProfile';
import AdminSetLocation from './modules/or_admin/AdminSetLocation';
import OrAdminAddPage from './modules/or_admin/OrAdminAddPage';
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<OrganisationRequestPage/>} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword/>}/>
        <Route path="/forgotpassword" element={<ForgotPassWordPage/>}/>

        {/* OR ADMIN */}
        <Route path="/or-admin" element={<AdminDashboard />} >

          <Route index element={<OrHome />} />
          <Route path="users" element={<UserManager />} />
          {/* <Route path="teamlead" element={<TeamLeadAssign />} />
          <Route path="attendance" element={<AttendanceSetting />} />
          <Route path="performance" element={<PerformanceAnalyzer />} /> */}
          {/* addpage */}
          <Route path='adduser' element={<AddUser />} />
          <Route path='updateuser/:id' element={<UserUpdate />} />
          <Route path='teamleadassine' element={<OradminTeamLeadAssine />} />
          <Route path='attentancemanager' element={<AttentanceManager />} />
          <Route path='filemanage' element={<AdminFileManage />} />
          <Route path='salarymanage' element={<AdminSalaryManagement />} />
          <Route path='adminmyexpenses' element={<AdminMyExpenses />} />
          <Route path='allperformence' element={<PerformenceView />} />
          <Route path='taskreports' element={<AdminTaksReport />} />
          <Route path='taskreportsview/:Id' element={<AdminTaksReportView />} />
          <Route path='chat' element={<OrAdminChat/>} />
          <Route path='profile' element={<Or_adminProfile/>} />
          <Route path='setlocation' element={<AdminSetLocation/>} />
          <Route path='addminadd' element={<OrAdminAddPage/>} />
        </Route>

        {/* TEAM LEAD */}
        <Route path='/teamlead' element={<TeamLeadDashboard />}>
          <Route index element={<TeamLeadHome />} />
          <Route path='teamleatattentance' element={<TamLeadAttentance />} />
          <Route path='taskmanager' element={<TeamLeadTasckAssine />} />
          <Route path='tasklist/:Id' element={<TeamLeadTaskViewList />} />
          <Route path='uniqtask/:Id' element={<TeamLeadGetUniqTask />} />
          <Route path='filemanage' element={<TeamLeadFileManage />} />
          <Route path='myexpenses' element={<TeamLeadMyExpenses />} />
          <Route path='performence' element={<TeamLeadPerformenceManager />} />
          <Route path='myteam' element={<TeamLeadTeam />} />
          <Route path='myattentance' element={<TeamLeadMyAttentanceView />} />
          <Route path='mysalary' element={<TeamLeadSalary />} />
          <Route path='chat' element={<TeamLeadChat />} />
        </Route>

        {/* EMPLOYEE */}
        <Route path='/employee' element={<EmployeeDashbord />}>
          <Route index element={<EmplyeeHome />} />
          <Route path='attentance' element={<EmployeeAttentance />} />
          <Route path='task' element={<EmployeeTaskManager />} />
          <Route path='tasksubmition/:Id' element={<EpmplyeeTaskSubmition />} />
          <Route path='filemanager' element={<EmployeeFileManage />} />
          <Route path='myexpenses' element={<EmployeeExpences />} />
          <Route path='myteam' element={<EmployeeMyTeam />} />
          <Route path='attentancehistory' element={<EmployeeAttentanceHistory />} />
          <Route path='paimenthistory' element={<EmployeePaimentHistory />} />
          <Route path='performense' element={<EmployeePerformence />} />
          <Route path='chat' element={<EmployeeChact/>} />
        </Route>

        <Route path='/hr' element={<HrDashbord />}>
          <Route index element={<HrHome />} />
          <Route path='markattendance' element={<HrAttentanceMark />} />
          <Route path='attentancemanage' element={<HrManageAttentance />} />
          <Route path='myfiles' element={<HrFileManager />} />
          <Route path='performrnceview' element={<HrPerformenceAnalyser />} />
          <Route path='taskreportlist' element={<HrTaskReportEmplayView />} />
          <Route path='taskreport/:Id' element={<HrTaskReport />} />
          <Route path='myexopence' element={<HrMyexpenses />} />
          <Route path='attentancehistory' element={<HrMyAttentanceHistory />} />
          <Route path='paimenthistory' element={<HrPaimentHistory />} />
          <Route path='usermanage' element={<HrUserManageMent />} />
          <Route path='adduser' element={<HrAddUserRequest />} />
          <Route path='edit/:id' element={<HrUserUpdateRequest />} />
          <Route path='chat' element={<HrChat />} />
        </Route>

        {/* Accountent */}
        <Route path='/accountent' element={<AccountentDashbord />}>
          <Route index element={<AccountentHome />} />
          <Route path='attentance' element={<AccountentAttentance/>} />
          <Route path='allexpence' element={<AccountentExpenceManager/>} />
          <Route path='myattentance' element={<AccountentMyAttentance/>} />
          <Route path='paimenthistory' element={<AccountentPaimentHistory/>} />
          <Route path='myfiles' element={<AccountentFileManager/>} />
          <Route path='salarymanagement' element={<AccountentSalaryManagement/>} />
          <Route path='chat' element={<AccountentChat/>}></Route>
        </Route>

        {/* SupperAdmin */}
        <Route path='/__admin_' element={<SupperadminDashbord/>}>
          <Route index element={<SupperAdminHome/>}/>
          <Route path='requestmanagement' element={<SupperadminRequestView/>}/>
          <Route path='manageorgamisation' element={<SupperAdminManageOrganisation/>}/>
          <Route path='organisationinfo/:id' element={<SupperAdminOrganisationDetails/>}/>
          <Route path='chat' element={<SupperAdminChath/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
