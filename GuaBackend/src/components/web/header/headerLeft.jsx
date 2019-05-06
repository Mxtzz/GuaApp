import React from 'react'
import { Icon, Dropdown, Menu } from 'antd'
import { Link } from 'react-router-dom'
import avatar from '@/assets/adminHeadIcon.png'

// import DropdownMenu from './nav'

const HeaderLeft = ({ navList }) => {
  const aa = (
    <Menu className="header-nav">
      {navList.map(nav => (
        <Menu.Item key={nav.link}>
          <Link to={nav.link}>
            {nav.icon && <Icon type={nav.icon} style={{ marginRight: 15 }} />}
            <span className="nav-text">{nav.title}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <div className="header-left">
      {/* <i className="iconfont icon-airplane" style={{ color: '#055796' }} /> */}
      <img src={avatar} className="sider-avatar" alt="" style={{height: 30, width: 30}} />
      <img src="" alt=""/>
      {/* <span className="blog-name">瓜社团-管理平台</span> */}
      <a target="_blank" rel="noreferrer noopener" style={{color: '#055796'}} href="http://localhost:3000/admin">
        瓜社团
      </a>
      <Dropdown overlayClassName="header-dropdown" trigger={['click']} overlay={aa}>
        {/* <Dropdown overlayClassName="header-dropdown" trigger={['click']} overlay={<DropdownMenu navList={navList} />}> */}
        <Icon type="menu-o" className="nav-phone-icon" />
      </Dropdown>
    </div>
  )
}

export default HeaderLeft
