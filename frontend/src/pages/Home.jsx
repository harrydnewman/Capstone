import CameraWall from "../components/CameraWall";
import styles from '../styles/Home.module.css'
export default function Home() {
  return (
    <div className="home-page">
      <CameraWall />
      <div className="content">
        <h1>Hello World</h1>
      </div>
    </div>
  );
}
