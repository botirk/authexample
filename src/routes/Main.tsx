import React from 'react';

import { bellowNavbarCSSHeight } from '../components/Navbar';
import useDataQuery from '../hooks/useDataQuery';
import Contact from '../components/Contact';

const Main = () => {
  const data = useDataQuery();

  return <div style={{height: bellowNavbarCSSHeight}} className="container d-flex flex-column justify-content-center align-items-center">
    
    {!data.isLoggedIn && <h3 className="text-warning text-center mt-3">Please Log-in to view contacts!</h3>}


    {data.isLoggedIn && data.isLoading && <div className="spinner-border mb-3" role="status">
      <span className="visually-hidden-focusable">Loading...</span>
    </div>}

    {data.isLoggedIn && !data.isLoading && <button className="btn btn-primary d-inline-block mb-3" onClick={data.refresh}>
      {!data.data && <>Try load data again</>}
      {data.data && <>Reload</>}
    </button>}
    
    {data.isLoggedIn && data.data && <>
      <Contact isBusy={data.isLoading} onDelete={data.deleteContact} onUpdate={data.updateContact} onCreate={data.createContact} />
      {Object.values(data.data).sort((a,b) => parseInt(b.id) - parseInt(a.id)).map((v) => 
        <Contact key={v.id} contact={v} isBusy={data.isLoading} onDelete={data.deleteContact} onUpdate={data.updateContact} onCreate={data.createContact} />
      )}
    </>}

  </div>;
}

export default Main;