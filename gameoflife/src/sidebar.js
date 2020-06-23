import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebarParent">
      <div>This is the sidebar</div>
      <label htmlFor="rowrange">rows</label>
      <input type="range" className="vranger" id='colrange'/>
      <label htmlFor="colrange">columns</label>
      <input type="range" className='vranger' id='rowrange'/>
    </div>
  );
};

export default Sidebar;
