import React from 'react';

const Menu = () => {
    return (
        <div className='absolute  z-1000 h-screen w-2/6 bg-gradient-to-r from-black via-black/90 to-black/70'>
            <ul>
                <li><a href="#option1">Option 1</a></li>
                <li><a href="#option2">Option 2</a></li>
                <li><a href="#option3">Option 3</a></li>
                <li><a href="#option4">Option 4</a></li>
                <li><a href="#option5">Option 5</a></li>
                <li><a href="#option6">Option 6</a></li>
            </ul>
        </div>

    );
};

export default Menu;