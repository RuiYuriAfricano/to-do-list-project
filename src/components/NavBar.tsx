import React, { useState } from 'react';
import Toggle from 'react-toggle'

type INav = {
  dark: boolean,
  setDark: (value: boolean) => void
}

const NavBar: React.FC<INav> = ({ dark, setDark }) => {
  const [] = useState();

  return (
    <nav className="nav-menu bg-gray-800 py-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <span className="text-nav text-white text-lg font-semibold">Gestor de tarefas</span>
          </div>
          <div className="flex items-center">
            <Toggle
              onChange={() => {
                setDark(!dark)
              }}
              checked={dark}
              icons={false}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
