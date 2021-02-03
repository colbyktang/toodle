import React from "react"
import "./AdminPage.css"
import AdminNavBar from './AdminNavBar';
import QuestionStatsCardView from './QuestionStatsCardView';
import UserStatsCardView from './UserStatsCardView';
import {FaUserAlt} from "react-icons/fa";
class AdminPage extends React.Component{
    render(){
        return(
            <div className="admin-page-main-container">
                <div className="admin-page-nav-bar">
                    <AdminNavBar />
                </div>

                <div className="admin-page-functions">

                    <div className="admin-page-quick-links">
                        <h1>Quick links
                        </h1>
                        <hr></hr>
                        <div className="add-remove-functions">
                            <div className="add-tutors-div">
                                <a href= "#" className="quick-link-icon"><FaUserAlt /></a>
                                <span>Add Tutors</span>
                            </div>
                            <div className="add-professor-div">
                                <a href= "#" className="quick-link-icon"><FaUserAlt /></a>
                                <span>Add Professors</span>
                            </div>
                            <div className="remove-user-div">
                                <a href= "#" className="quick-link-icon"><FaUserAlt /></a>
                                <span>Remove User</span>
                            </div>
                        </div>

                    </div>

                    <div className="cardView">
                        <div className="cardView01">
                            <h1>User Stats: </h1>
                            <UserStatsCardView />
                        </div>

                        <div className="cardView02">
                            <h1>Question Stats: </h1>
                            <QuestionStatsCardView />
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}


export default AdminPage;