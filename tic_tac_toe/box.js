import React from 'react';

function Box(props) {
    var id = props.identity;

    function perform(){
        props.click(id);
    }
    return (
        <div key={id} onClick={perform} className="box_a">
            <h1>{props.text}</h1>
        </div>
    );
}

export default Box;