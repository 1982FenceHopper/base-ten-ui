import './App.css';
import Button from './components/Button';
import Dialog from './components/Dialog';
import Slider from './components/Slider';

const App = () => {
  return (
    <div className="min-w-screen min-h-screen p-4 flex flex-col space-y-8">
      <Button />
      <Dialog />
      <Slider />
    </div>
  );
};

export default App;
