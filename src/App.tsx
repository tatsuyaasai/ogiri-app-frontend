import React from 'react';
import './App.css';
import Body from './Body';


function App() {
  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

function Header(){
    return(
        <header className="site-header">
            <div className="wrapper site-header__wrapper">
                <div className="site-header__start">
                    <span className="header-title">大喜利掲示板</span>
                </div>
                <div className="site-header__middle">
                </div>
                <div className="site-header__end">
                    <span className="button">Googleアカウントでログイン</span>
                </div>
            </div>
        </header>
    )
}

const Footer = () => {
    return(
        <footer className="wrapper">
            <div>createdBy T.A</div>
        </footer>
    )
}
export default App;
