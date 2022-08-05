import React, {useState, useEffect} from 'react';
import Box from './box';
import Boxes from './boxes';

function Board() {
const [player, setPlayer] = useState(true);
const [boxes, setBoxes] = useState(Boxes);
const [gameState, setGameState] = useState([[],[]]);
const [winner, setWinner] = useState("");
    /*123
    456
    789
    147
    258
    369
    357
    158
    */
   const axis = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [3,5,7],
    [1,5,9]
]

function compareList(a, b) {
    var exist = [];
    for(var i = 0; i < 3; i++)
    {
        //console.log(a, b.charAt(i));
        if(!a.includes(b.charAt(i)))
        {
            exist.push(false);
        }else{
            exist.push(true);
        }
    }
    return (exist[0]&exist[1]&exist[2]);
}

useEffect(()=>{
    if(player)
    {
        //console.log(gameState[0], axis[0]);
        //console.log(JSON.stringify(gameState[0]).slice(1,-1));
        if(gameState[0].length >= 3)
        {
            var won = false;
            for(var i = 0; i < axis.length; i++)
            {
                var game = JSON.stringify(gameState[0]).slice(1,-1).replaceAll(",","");
                var point = JSON.stringify(axis[i]).slice(1,-1).replaceAll(",","");
            //console.log(game, point);
             var value = compareList(game, point);
                if(value === 1)
                {
                    won = true;
                }
            }
            if(won === true)
            {
                setWinner("Player one has won!");
            }
        }
    }else{
        if(gameState[1].length >= 3)
        {
            var won = false;
        // console.log(gameState[1], axis[0]);
            for(var i = 0; i < axis.length; i++)
            {
                var game = JSON.stringify(gameState[1]).slice(1,-1).replaceAll(",","");
                var point = JSON.stringify(axis[i]).slice(1,-1).replaceAll(",","");
                //console.log(game, point);
                var value = compareList(game, point);
                if(value === 1){
                    won = true;
                }
            }
            if(won === true)
            {
                setWinner("Player two has won!");
            }
        }
    }
},[gameState]);

function checkWinner(user, id){
    if(user === true)
    {
        setGameState((prevGameState)=>{
            var firstP = prevGameState[0];
            var newAb = [...firstP, id];
            var newState = [newAb, prevGameState[1]];
            return newState;
           }); 
    }else if(user === false){
        setGameState((prevGameState)=>{
            var firstP = prevGameState[1];
            var newAb = [...firstP, id];
            var newState = [prevGameState[0],newAb];
            return newState;
           }); 
    }
}

function play(id){
    if(player)
    {
        checkWinner(true, id)
        setBoxes((prevBox)=>{
            return prevBox.map((val) =>{
                var c_id = val.id
                if(c_id === id)
                {
                    return ({...val, text: "X"});
                }else{
                    return ({...val});
                }
            })
           });
           setPlayer((prevPlayer)=>{
            return !prevPlayer;
           }); 
    }else{
        checkWinner(false, id)
        setBoxes((prevBox)=>{
            return prevBox.map((val) =>{
                var c_id = val.id
                if(c_id === id)
                {
                    return ({...val, text: "0"});
                }else{
                    return ({...val});
                }
            })
           });
           setPlayer((prevPlayer)=>{
            return !prevPlayer;
           });
    }
}

const box = boxes.map((value) => {
    return <Box click={play} identity={value.id} text={value.text}/>
})

    return (
        <div>
            <div id="board">
                {box}
            </div>
            <h1>{winner}</h1>
        <select>
            <option value='X'>X</option>
            <option value='0'>0</option>
        </select>
        </div>
    );
}

export default Board;