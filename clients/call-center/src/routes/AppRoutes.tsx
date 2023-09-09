import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import BaseLayout from "@layouts/BaseLayout";
import CallReceiptHandlerLayout from "@layouts/CallReceiptHandlerLayout/CallReceiptHandlerLayout";
import CallReceiptPage from "@pages/CallReceiptPage/CallReceiptPage";
import CallReceiptHandlerPage from "@pages/CallReceiptHandlerPage/CallReceiptHandlerPage";
import DashboardPage from "@pages/DashboardPage/DashboardPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import BookingPage from "@pages/BookingPage/BookingPage";
import { Navigate } from "react-router-dom";
import { authStorage } from "@utils/storage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<CallReceiptHandlerLayout />}>
                {/* Role: Call Center S2 */}
                <Route element={<ProtectedRoute/>}>
                   {authStorage.getAuthData()?.role === "Coordinator" && <Route path="/call-receipt-handle" element={<CallReceiptHandlerPage/>}/>}
                </Route>
                {/* Role: Call Center S3 */}
                <Route element={<ProtectedRoute/>}>
                   {authStorage.getAuthData()?.role === "Supervisor" && <Route path = "/dashboard" element = {<DashboardPage/>}/>}
                </Route>
                {/* <Route path="/" element={<DashboardPage/>} /> */}
                {/* <Route path="/call-receipt-handle" element={<CallReceiptHandlerPage/>}/> */}
                {/* <Route path = "/dashboard" element = {<DashboardPage/>}/> */}
                <Route path = "/booking-page/:phoneNumber" element = {<BookingPage/>}/>
                <Route path = "/statistic" element = {<CallReceiptHandlerPage/>}/>
                <Route path = "/report" element = {<CallReceiptHandlerPage/>}/>
                <Route path = "/team-member" element = {<CallReceiptHandlerPage/>}/>
                <Route path = "/feedback" element = {<CallReceiptHandlerPage/>}/>
                <Route path = "/contact" element = {<CallReceiptHandlerPage/>}/>
            </Route>
             {/* Role: Call Center S1 */}
            <Route element={<ProtectedRoute/>}>
                  {authStorage.getAuthData()?.role === "Receptionist" && <Route path="/call-receipt" element={<CallReceiptPage/>}/>} 
            </Route>
            {/* <Route path="/call-receipt" element={<CallReceiptPage/>}/> */}
            <Route path="/" element={<LoginPage/>}/>
            
            {/* All paths */}
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
};

export default AppRoutes;
