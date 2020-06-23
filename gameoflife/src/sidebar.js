import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebarParent">
      {/* <div>This is the sidebar</div> */}
      <label htmlFor="rowrange">rows</label>
      <input type="range" className="vranger" min="10" max="100" defaultValue="50" id='colrange'/>
      <label htmlFor="colrange">columns</label>
      <input type="range" className='vranger' min="10" max="100" defaultValue="50" id='rowrange'/>
    </div>
  );
};

export default Sidebar;