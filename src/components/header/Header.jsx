import UncontrolledExample from '../uncontrolledexample/UncontrolledExample'
import './header.css'

function Header() {
  return (
    <div className='header'>
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div >
      <img className='headerImg' src="https://images.pexels.com/photos/1376588/pexels-photo-1376588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        {/* <UncontrolledExample /> */}
    </div>
  )
}

export default Header