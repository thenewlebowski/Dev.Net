import React from 'react'
import {
    Header,
    Sidebar,
    Content,
    Footer
} from './index';

export default function Layout() {
    return (
    <div className="c-app c-default-layout">
      <Sidebar/>
      <div className="c-wrapper">
        <Header/>
        <div className="c-body">
          <Content/>
        </div>
        <Footer/>
      </div>
    </div>
    )
}
