import * as React from 'react';
import { Admin, CustomRoutes, fetchUtils, Resource } from 'react-admin';
import { EventCreate } from './Components/Events/create';
import { EventList } from './Components/Events/list';
import { EventShow } from './Components/Events/show';
import { MusicianList } from './Components/Musicians/list';
import { JobList } from './Components/Jobs/list';
import { DataProvider } from './DataProvider/index';
import { SetShow } from './Components/Sets/show.js';
import { MusicianCreate } from './Components/Musicians/create.js';
import { MusicianEdit } from './Components/Musicians/edit.js';
import { InstrumentsList } from './Components/Instruments/list';
import { InstrumentCreate } from './Components/Instruments/create';
import { MusicianShow } from './Components/Musicians/show';
import { InstrumentEdit } from './Components/Instruments/edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import PianoIcon from '@mui/icons-material/Piano';
import FestivalIcon from '@mui/icons-material/Festival';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import { FirebaseAuthProvider } from 'react-admin-firebase';
import CustomLoginPage from './Auth/CustomLoginPage';
import { EventEdit } from './Components/Events/edit';
import PackagesList from './Components/Packages/list';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { PackageShow } from './Components/Packages/show';
import { PackageCreate } from './Components/Packages/create';
import firebase from 'firebase/compat/app';
import { gapi } from 'gapi-script';
import { AuthProvider } from './Auth/AuthProvider';
import { Route } from 'react-router-dom';
import { GoogleRedirect } from './Auth/GoogleRedirect';
import { JobCreate } from './Components/Jobs/create';
import UsersList from './Components/Users/list';
import { UserCreate } from './Components/Users/create';
import { UserEdit } from './Components/Users/edit';
import { PackageEdit } from './Components/Packages/edit';
import EventTypesList from './Components/Event-types/list';
import { EventTypeShow } from './Components/Event-types/show';
import { EventTypeCreate } from './Components/Event-types/create';
import { EventTypeEdit } from './Components/Event-types/edit';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    user.getIdToken().then(function (idToken) {
      console.log('JWT', idToken);
      localStorage.setItem('jwt', idToken);
      return idToken;
    });
  }
});

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = DataProvider(
  `${process.env.REACT_APP_BACKEND_URL}/api`,
  httpClient
);

const App = () => {
  React.useEffect(() => {
    const start = async () => {
      await gapi.client.init({
        apiKey: firebaseConfig.apiKey,
        discoveryDocs: [
          'https://docs.googleapis.com/$discovery/rest?version=v1',
          'https://www.googleapis.com/discovery/v1/apis/drive/v2/rest',
        ],
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope:
          'https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive',
      });
    };
    gapi.load('client:auth2', start);
  });

  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={AuthProvider}
      loginPage={CustomLoginPage}
    >
      <CustomRoutes noLayout>
        <Route path='/connect/google/redirect' element={<GoogleRedirect />} />
      </CustomRoutes>
      <Resource
        name='events'
        edit={EventEdit}
        list={EventList}
        show={EventShow}
        create={EventCreate}
        icon={CalendarMonthIcon}
      />
      <Resource
        name='musicians'
        list={MusicianList}
        create={MusicianCreate}
        edit={MusicianEdit}
        show={MusicianShow}
        icon={GroupsIcon}
      />
      <Resource name='jobs' create={JobCreate} />
      <Resource name='sets' show={SetShow} />
      <Resource name='songs' />
      <Resource
        name='instruments'
        list={InstrumentsList}
        create={InstrumentCreate}
        edit={InstrumentEdit}
        icon={PianoIcon}
        recordRepresentation='name'
      />
      <Resource
        name='packages'
        icon={NightlifeIcon}
        list={PackagesList}
        show={PackageShow}
        create={PackageCreate}
        edit={PackageEdit}
        recordRepresentation='name'
      />
      <Resource
        name='types'
        icon={FestivalIcon}
        list={EventTypesList}
        show={EventTypeShow}
        create={EventTypeCreate}
        edit={EventTypeEdit}
        recordRepresentation='name'
      />
      <Resource
        name='admins'
        icon={AdminPanelSettingsIcon}
        list={UsersList}
        edit={UserEdit}
        create={UserCreate}
        recordRepresentation='name'
      />
    </Admin>
  );
};
export default App;
