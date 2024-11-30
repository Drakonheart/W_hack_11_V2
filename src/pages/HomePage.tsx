import ChatHud from "../component/ChatHud";
import InfoHud from "../component/InfoHud";
import "./HomePage.css";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="home_page_main">
      <ChatHud />
      <InfoHud />
    </div>
  );
};

export default HomePage;
