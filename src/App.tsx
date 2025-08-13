import './App.css';
import Button from './components/button';
import Dialog from './components/Dialog';

const App = () => {
  return (
    <div className="min-w-screen min-h-screen p-4 flex flex-col space-y-8">
      <Button />
      <Dialog />
    </div>
  );
};

export default App;
