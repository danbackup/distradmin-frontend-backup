// in src/App.js
import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { EventCreate } from './Components/Events/create';
import { EventList } from './Components/Events/list';
import { EventShow } from './Components/Events/show';
import { MusicianList } from './Components/Musicians/list';
import { JobList } from './Components/Jobs/list';
import { DataProvider } from './DataProvider/index';

const dataProvider = DataProvider('http://localhost:1337/api');

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name='events'
      list={EventList}
      show={EventShow}
      create={EventCreate}
    />
    <Resource name='musicians' list={MusicianList} />
    <Resource name='jobs' list={JobList} />
  </Admin>
);
export default App;
