import { useState } from "react";


const MoviesPortal = () => {
    const [searchInputText, setSearchInputText] = useState('')
    const [enteredSearchText, setEnteredSearchText] = useState('')

    const onSerchTextEnter = (e)=>{
        e.preventDefault()
        setEnteredSearchText(enteredSearchText)
    }
  return (
    <>
    <div className="row">
      <div className="col-md-12">
        <form onSubmit={onSerchTextEnter}>
          <input
            type="text"
            placeholder="Search Movie"
            className="form-control"
            value={searchInputText}
            onChange={(e)=> setSearchInputText(e.target.value)}
          />
        </form>
      </div>
    </div>
    </>
  );
};

export default MoviesPortal;
