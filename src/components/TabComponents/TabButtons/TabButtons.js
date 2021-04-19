import React from 'react';

const TabButtons = ({buttons, changeTab, activeTab}) =>{

    return(
        <div className="tab-buttons">
            {buttons.map(button =>{
                return <button className={button === activeTab? 'active': ''} onClick={()=>changeTab(button)}>{button}</button>
            })}
        </div>
    )
}

export default TabButtons;