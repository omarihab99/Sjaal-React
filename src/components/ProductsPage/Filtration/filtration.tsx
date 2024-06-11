//rscp
import "./filtration.css";

const Filtration = ({ length }: { length: number }) => {
    return (
       
<div  className="container d-flex">
    <div className="row" style={{width: "100%"}}>

        <div className="d-flex col-3">
            <p>Filter:</p> 
            <div className="dropdown margin-10">
                <button className="btn dropdown-toggle myDropDown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Availability &nbsp;
                </button>
                 {/* <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul> */}
              </div>
              <div className="dropdown margin-10">
                <button className="btn dropdown-toggle myDropDown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Price &nbsp;
                </button>
                {/* <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul> */}
              </div>
        </div>

              <div className="col-5">
              </div>

             <div className="d-flex col-4">
                <p>Sort by:</p>
                <div className="dropdown margin-10">
                    <button className="btn dropdown-toggle myDropDown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Best selling 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                    {/* <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>  */}
                  </div>
                  <p className="margin-10"> {length} Products</p>
             </div>
               
        </div>
</div>


    );
};

export default Filtration;