import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';


function Cube() {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });



    const handleMouseMove = (event) => {
        if (isMouseDown) {
            setMousePosition({ x: -1*(event.clientY - window.innerHeight/2), y: event.clientX - window.innerWidth / 2 });
            console.log(mousePosition)
        }
    };

    const handleMouseDown = () => {
        setIsMouseDown(true);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };



    return (
        <animated.div
            className="cube"
            style={{ transform: `rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`, animation: `${!isMouseDown && 'rotate-anim 50s linear infinite' }` }}
            
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <animated.div onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}>
                <div className="card" >
                    <img src="https://picsum.photos/id/20/600/300" />
                    <h2>Card Title</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veritatis eaque necessitatibus, explicabo
                        vero hic, perspiciatis unde minus error consectetur, quos sunt.
                    </p>
                </div>
            </animated.div>
            <animated.div onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}>
                <div className="card">
                    <img src="https://picsum.photos/id/20/600/300" />
                    <h2>Card Title</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veritatis eaque necessitatibus, explicabo
                        vero hic, perspiciatis unde minus error consectetur, quos sunt.
                    </p>
                </div>
            </animated.div>
            <animated.div onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}>
                <div className="card">
                    <img src="https://picsum.photos/id/20/600/300" />
                    <h2>Card Title</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veritatis eaque necessitatibus, explicabo
                        vero hic, perspiciatis unde minus error consectetur, quos sunt.
                    </p>
                </div>
            </animated.div>
            <animated.div onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}>
                <div className="card">
                    <img src="https://picsum.photos/id/20/600/300" />
                    <h2>Card Title</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veritatis eaque necessitatibus, explicabo
                        vero hic, perspiciatis unde minus error consectetur, quos sunt.
                    </p>
                </div>
            </animated.div>
            <animated.div onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}>
                <div className="card">
                    <img src="https://picsum.photos/id/20/600/300" />
                    <h2>Card Title</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veritatis eaque necessitatibus, explicabo
                        vero hic, perspiciatis unde minus error consectetur, quos sunt.
                    </p>
                </div>
            </animated.div>
            <animated.div onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}>
                <div className="card">
                    <img src="https://picsum.photos/id/20/600/300" />
                    <h2>Card Title</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veritatis eaque necessitatibus, explicabo
                        vero hic, perspiciatis unde minus error consectetur, quos sunt.
                    </p>
                </div>
            </animated.div>
        </animated.div>
    );
}

export default Cube;



    // < div >
    // <div class="card" style={{ "transform": "rotate(-4.4320363973713235deg);" }}><img src="https://picsum.photos/id/20/600/300" />
    //     <h2>Card Title</h2>
    //     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veritatis eaque necessitatibus, explicabo vero hic, perspiciatis unde minus error consectetur, quos sunt.</p>
    // </div>
    //         </div >