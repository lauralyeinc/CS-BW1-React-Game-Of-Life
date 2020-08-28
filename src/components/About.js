import React from 'react';

import '../styling/game.css';

const About = () => {
    return (
        <div className="About-Section">
            <p>
            The Game of Life is a celluar automaton originally created by John Horton Conway in 1970. This game is played on a 2D grid of cells. Each cell can either be alive or dead. There are four rules that determine if a cell is alive or dead. To learn more about Conway's Game of Life, vist 
            <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank"> Wikipedia </a>.
            </p>
        </div>
    )
}

export default About; 