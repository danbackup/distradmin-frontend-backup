// in src/App.js
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

const dataProvider = DataProvider('http://localhost:1337/api');

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name='events'
      list={EventList}
      show={EventShow}
      create={EventCreate}
    />
    <Resource
      name='musicians'
      list={MusicianList}
      create={MusicianCreate}
      edit={MusicianEdit}
      show={MusicianShow}
    />
    <Resource name='jobs' list={JobList} />
    <Resource name='sets' show={SetShow} />
    <Resource name='songs' />
    <Resource
      name='instruments'
      list={InstrumentsList}
      create={InstrumentCreate}
      edit={InstrumentEdit}
      recordRepresentation='name'
    />
  </Admin>
);
export default App;
