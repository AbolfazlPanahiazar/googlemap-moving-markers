import "./App.css";
import Map from "./components/map";

function App() {
  return (
    <div className="App">
      <Map
        center={{
          lat: 51,
          lng: 17,
        }}
        zoom={5}
      />
    </div>
  );
}

export default App;
