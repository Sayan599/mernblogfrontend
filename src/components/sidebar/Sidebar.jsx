import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './sidebar.css'

function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("https://mernblogbackend.onrender.com/api/categories");
            setCats(res.data);
        }
        getCats();
    }, [])

    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className='sidebarTitle'>ABOUT ME</span>
                <img src="https://images.pexels.com/photos/1524123/pexels-photo-1524123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est enim voluptate adipisci nam totam cupiditate necessitatibus fugit, tenetur cum! Incidunt magni, pariatur quod molestiae nostrum iste hic earum! Commodi, reiciendis?
                    Asperiores, expedita cum culpa id molestias maxime vero natus earum quos ad quod quam, possimus corrupti numquam nam nostrum. Velit, vitae illum doloremque dolor earum iste eaque fuga quisquam. Dignissimos?
                </p>
            </div>
            <div className='sidebarItem'>
                <span className='sidebarTitle'>CATEGORIES</span>
                <ul className="sidebarList">
                    {
                        cats.map(cat => (
                            <Link to={`http://localhost:3000?cat=${cat.name}`} key={cat._id} className="link">
                                <li className="sidebarListItem" key={cat._id} >{cat?.name}</li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
            <div className='sidebarItem'>
                <span className="sidebarTitle">FOLLOW US</span>
                <div className='sidebarSocial'>
                    <i className="sidebarIcon fa-brands fa-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-instagram"></i>
                    <i className="sidebarIcon fa-brands fa-pinterest"></i>
                    <i className="sidebarIcon fa-brands fa-twitter"></i>
                </div>
            </div>
        </div>
    )
}

export default Sidebar