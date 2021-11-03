import Filterbar from './filterBar';
import Sortdiv from './sortBar';
import SearchBar from './searchBar';

function SortBar() {
  return (
    <div className="App">
      <SearchBar />
      <Sortdiv />
      <Filterbar />
    </div>
  );
}
