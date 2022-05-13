import { React, useState } from 'react'

import './App.css';
import { find } from './checker/algorithm';

export default function Text() {
    const [inputText, setInputText] = useState([]); 
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState('');

    /*
    Check and replace the last word 
    */
    function handleButton(word) {
        console.log('button: ' + word);

        let end = text.length;

        let i = text.length - 1;

        while (i >= 0 && text[i] === ' ') {
            i--;
        }

        for (; i >= 0; i--) {
            end = i;
            if (text[i] === ' ') {
                break;
            }
        }

        setText(text.substring(0, end) + ' ' + word);
    }

    function handleChange(event) {
        setText(event.target.value);
        setInputText(event.target.value.split(' '));
        console.log(inputText);
        getSuggestions(event);
    }

    function getSuggestions(event) {

        if (inputText.length === 0) {
            setSuggestions([]);
        } else {
            let index = inputText.length - 1;

            while (index >= 0 && inputText[index] === '') {
                index--;
            }

            if (index >= 0) {
                setSuggestions(find(inputText[index]));
            } else {
                setSuggestions([]);
            }
        }
    }

    return (
        <div className="text">
            <input className="input" type="text"
            placeholder="Type here"
            value={text}
            onChange={handleChange} maxLength={4096}/>

            <div className="sugg">
               {suggestions.map((item) => 
               <button key={item} onClick={() => handleButton(item)}
               className="button" type="button">{item}</button>)}
            </div>
        </div>
    )
}
