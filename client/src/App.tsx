import { Navbar } from './components/navbar/Navbar';
import EventContainer from './container/EventsContainer';



function App() {

  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <EventContainer />
    </div>
  );
}

export default App;
