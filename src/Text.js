import { React, useState } from 'react'

import './App.css';
import { find } from './checker/algorithm';

export default function Text() {
    const [inputText, setInputText] = useState([]); 
    const [suggestions, setSuggestions] = useState([]);

    /*
    Check the last word
    */

    function handleChange(event) {
        setInputText(event.target.value.split(' '));
        console.log(inputText);
        getSuggestions(event);
    }

    function getSuggestions(event) {
        const word = inputText.length > 0 ? inputText[inputText.length - 1] : '';

        if (word === '') {
            setSuggestions([]);
        } else {
            setSuggestions(find(word));
        }
    }

    return (
        <div className="text">
            <input className="input" type="text"
            placeholder="Type here"
            onKeyUp={handleChange} maxLength={1000}/>

            <div className="sugg">
               {suggestions.map((item) => 
               <button key={item} className="button" type="submit">{item}</button>)} 
            </div>
        </div>
    )
}
