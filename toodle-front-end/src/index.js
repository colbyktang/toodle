import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Welcome from './Welcome';
import Footer from './footer';
import Promotion from './Promotion';
import Faq from './Faq';
import Disclaimer from './Disclaimer';
import Navigation from './Navigation';
import RegConfirmation from './registrationConfirmation';
import StudentLandingPage from './studentLandingPage';
import TutorLandingPage from './TutorLandingPage';
import AnswerPage from './AnswerPage';
// import SideMenuStudent from './SideMenuStudent';
// import StudentCardView from './StudentCardView';
import QuestionThreadsView from './QuestionThreadsView';
import RecommendThreadView from './RecommendThreadView';
import ProtectedRoutes from './ProtectedRoutes';
import ProtectedRoutes_STUDENT from './ProtectedRoutes_STUDENT';
import TutorJobPosting from './TutorJobPosting';
import TutorApplyFormPage from './TutorApplyFormPage';
// import Registration from './Registraion';
// import Login from './Login';
import StudentPersistentDrawer from './StudentPersistentDrawer'
import logout from './logout';
import StudentReports from './StudentReports'
import UserFields from './userPage';
import StudentAccountPage from './studentAccountPage';
import AdminPage from './AdminPage';
import ThreadsAroundToodle from './ThreadsAroundToodle';
import TutorHome from './TutorHome';
import TutorProfilePage from './TutorProfilePage';
import TutorBasicInfoPage from './TutorBasicInfoPage';
class App extends Component{
  render(){
    return(
      <div>
        <Router>
          <div className="Router-test">
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/userPage" component={UserFields}/>
              <Route path="/registrationConfirmation" component={RegConfirmation}/>
              {/* <Route path="/studentLandingPage" component={StudentLandingPage} /> */}
              <ProtectedRoutes_STUDENT path="/studentLandingPage" component={StudentLandingPage} />
              <ProtectedRoutes path="/TutorLandingPage" component={TutorLandingPage} />
              <ProtectedRoutes path="/TutorHome" component={TutorHome} />
              <ProtectedRoutes path="/TutorProfilePage" component={TutorProfilePage} />
              <ProtectedRoutes path="/TutorBasicInfoPage" component={TutorBasicInfoPage} />
              {/* <Route path="/TutorLandingPage" component={TutorLandingPage} /> */}
              <Route path="/AnswerPage" component={AnswerPage} />
              {/* <Route path="/SideMenuStudent" component={SideMenuStudent} /> */}
              {/* <Route path="/StudentCardView" component={StudentCardView} /> */}
              <Route path="/QuestionThreadsView" component={QuestionThreadsView} />
              <Route path="/RecommendThreadView" component={RecommendThreadView} />
              <Route path="/TutorJobPosting" component={TutorJobPosting} />
              <Route path="/TutorApplyFormPage" component={TutorApplyFormPage} />
              <Route path="/logout" component={logout} />
              <Route path="/StudentPersistentDrawer" component={StudentPersistentDrawer} />
              <Route path="/StudentReports" component={StudentReports} />
              <Route path="/studentAccountPage" component={StudentAccountPage} />
              <Route path="/AdminPage" component={AdminPage} />
              <Route path="/ThreadsAroundToodle" component={ThreadsAroundToodle} />

            </Switch>

          </div>
        </Router>
      </div>
    )
  }
}


class Main extends Component{
  render(){
    return(
      <div>
        <Navigation/>
        <Welcome />
        <Promotion />
        <Disclaimer />
        <div className="faq-header">
          <h1>FAQs</h1>
        </div>
        <Faq title="What is Toodle?" content="Toodle is an online tutoring that allows student to ask a tutor any question"/>
        <Faq title="Why use Toodle?" content="Toodle is an online tutoring that allows student to ask a tutor any question"/>
        <Faq title="How does Toodle work?" content="Toodle is an online tutoring that allows student to ask a tutor any question"/>
        <Faq title="How long can I get a tutor response?" content="Toodle is an online tutoring that allows student to ask a tutor any question"/>
        <Faq title="How do I start asking question on Toodle?" content="Toodle is an online tutoring that allows student to ask a tutor any question"/>

        <Footer />
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
