import * as React from 'react';
import { Admin, Resource } from 'react-admin';
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
import CustomLoginPage from './CustomLoginPage';
import firebase from 'firebase/compat/app';
import { EventEdit } from './Components/Events/edit';
import PackagesList from './Components/Packages/list';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import { PackageShow } from './Components/Packages/show';

const firebaseConfig = {
  apiKey: 'AIzaSyAoXvB8w9DPOZPx2crM9pjiDRmAbT7tGKM',
  authDomain: 'distradmin.firebaseapp.com',
  projectId: 'distradmin',
  storageBucket: 'distradmin.appspot.com',
  messagingSenderId: '513693582210',
  appId: '1:513693582210:web:85c65680f42dde5d47859b',
};
firebase.initializeApp(firebaseConfig);

const authProvider = FirebaseAuthProvider(firebaseConfig);
const dataProvider = DataProvider('http://localhost:1337/api');

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={CustomLoginPage}
  >
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
    <Resource name='jobs' list={JobList} />
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
    <Resource name='packages' icon={NightlifeIcon} list={PackagesList} show={PackageShow}/>
  </Admin>
);
export default App;
