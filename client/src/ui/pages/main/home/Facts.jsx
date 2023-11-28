import React from 'react'
import Cube from './Cube'


function Facts() {
    return (
        <section className="facts_field">
            <div className="facts_header">
                <h2 data-aos="zoom-in-up">Interesting Facts</h2>
            </div>
            <div class="facts_container">
                <Cube />
            </div>
        </section>
    )
}

export default Facts