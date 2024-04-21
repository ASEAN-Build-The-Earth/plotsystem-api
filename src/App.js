import logo from './resources/aseanbte_logo.gif';
import './App.css';
import SearchBar from './components/SearchBar'; 
import Result from './components/Result'; 
function App() {
  return (
    <div className="app">
      <header className="app_header">
        <img src={logo} className="app_logo" alt="logo"/>
        <div className="app_content">
          <p><strong>ASEAN Build The Earth Plot System</strong></p>
          <SearchBar>
            <Result/>
          </SearchBar>
        </div>
        <footer className="app_footer">
          <a
            className="app_link"
            href="https://github.com/ASEAN-Build-The-Earth"
            target="_blank"
            rel="noopener noreferrer">
              <span className="github_link">
                <small>Our Github</small>
                <svg width="1.75rem" height="1.75rem" ariaHidden="true" viewBox="-5 -4.75 30 30">
                  <path fill="currentColor" 
                    d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z">
                  </path>
                </svg>
              </span>
          </a>
          <a
            className="app_link"
            href="https://asean.buildtheearth.asia/"
            target="_blank"
            rel="noopener noreferrer">
            <span className="website_link">
              <small className="website_link">Visit Our Website</small>
              <svg width="1.75rem" height="1.75rem" ariaHidden="true" viewBox="-5 -4.75 30 30">
                <path fill="currentColor" 
                  d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z">
                </path>
              </svg>
            </span>
          </a>
        </footer>
      </header>
    </div>
  );
}




export default App;
