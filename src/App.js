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
import { FirebaseAuthProvider } from 'react-admin-firebase';
import CustomLoginPage from './Auth/CustomLoginPage';
import { EventEdit } from './Components/Events/edit';
import PackagesList from './Components/Packages/list';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import { PackageShow } from './Components/Packages/show';
import { PackageCreate } from './Components/Packages/create';
import firebase from 'firebase/compat/app';
import { gapi } from 'gapi-script';
import { AuthProvider } from './Auth/AuthProvider';
import { Route } from 'react-router-dom';
import { GoogleRedirect } from './Auth/GoogleRedirect';
import { JobCreate } from './Components/Jobs/create';

const firebaseConfig = {
  apiKey: 'AIzaSyAoXvB8w9DPOZPx2crM9pjiDRmAbT7tGKM',
  authDomain: 'distradmin.firebaseapp.com',
  projectId: 'distradmin',
  storageBucket: 'distradmin.appspot.com',
  messagingSenderId: '513693582210',
  appId: '1:513693582210:web:85c65680f42dde5d47859b',
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

const dataProvider = DataProvider(`${process.env.REACT_APP_BACKEND_URL}/api`, httpClient);

const App = () => {
  React.useEffect(() => {
    const start = async () => {
      await gapi.client.init({
        apiKey: firebaseConfig.apiKey,
        discoveryDocs: [
          'https://docs.googleapis.com/$discovery/rest?version=v1',
        ],
        clientId:
          '513693582210-62rkmbjorrpe4fcau3041prm70i1889g.apps.googleusercontent.com',
        scope:
          'https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive.file',
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
      <Resource name='jobs' list={JobList} create={JobCreate} />
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
      />
    </Admin>
  );
};
export default App;
