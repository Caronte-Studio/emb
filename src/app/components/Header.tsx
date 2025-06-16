import React from "react";

interface HeaderProps {
    title: string;
}

export const Header = ({title}: HeaderProps) => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark ">
      <div className="container-fluid">
        <span className="navbar-brand">{title}</span>
      </div>
    </header>
  );
};
