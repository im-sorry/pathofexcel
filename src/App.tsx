import './App.css';
import { Timeline } from './interaction/timeline';
import { Scene } from './modules/scene';
import { Being } from './modules/being';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
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
        attack_speed: 0,
        action_duration: 1500,
        block_rate: 0,
        dodge_value: 0,
        hit_value: 0,
      },
      true
    );
    const enemy = new Being(
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
        attack_speed: 0,
        action_duration: 1500,
        block_rate: 0,
        dodge_value: 0,
        hit_value: 0,
      },
      true
    );
    scene.addPlayer(player);
    // scene.addEnemy(enemy);
    const timeline = new Timeline();
    timeline.addScene(scene);
    timeline.run();
  }, []);
  return (
    <div className="App">
      <div className="user"></div>
      <div className="monster"></div>
    </div>
  );
}

export default App;
