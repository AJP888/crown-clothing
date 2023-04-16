import { Outlet } from "react-router-dom";
import Directory from "../../components/directory/directory.components";

const Home = ({ categories }) => {
  return (
    <div>
      <Directory categories={categories} />
      <Outlet />
    </div>
  );
};

export default Home;
