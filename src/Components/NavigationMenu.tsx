import React from "react";
import "./nav_bar.css";

function NavigationMenu() {
  return (
    <div className="nav_bar">
      <h1>Админ панель</h1>
      <ul>
        <li>
          <a href="">Ссылка 1</a>
        </li>
        <li>
          <a href="">Ссылка 2</a>
        </li>
        <li>
          <a href="">Ссылка 3</a>
        </li>
      </ul>
    </div>
  );
}

export default NavigationMenu;
