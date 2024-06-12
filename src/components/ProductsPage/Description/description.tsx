import "./description.css";

const Description = ({ description, collName }: { description: string; collName: string }) => {
    return (
        <div className="container">
        <h1 id="description-h"> {collName}</h1>
    
        <div id="divP">
            <p id="description-p">
              {description}
            </p>
            
        </div>
    </div>
    );
};

export default Description;