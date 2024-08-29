import './App.css';
import { Timeline } from './interaction/timeline';
import { Scene } from './modules/scene';
import { Being } from './modules/being';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const timeline = new Timeline();
    const scene = new Scene();
    const player = new Being(
      {
        life: 512,
        physical_damage: [8, 12, 0],
        strength: 10,
        agileness: 10,
        intelligence: 10,
        level: 1,
        exp: 0,
        name: 'wo',
        base_crit_rate: 5,
        attack_speed: 2,
        action_duration: 1000,

        block_rate: 0,

        dodge_value: 0,
        hit_value: 0,
      },
      true
    );
  }, []);
  return (
    <div className="App">
      <div className="user"></div>
      <div className="monster"></div>
    </div>
  );
}

export default App;
