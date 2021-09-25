import React from 'react'
import './styles.css'

const Loader: React.FC = () => {
    return (
        <div id="cupcake" className="box">
            <span className="letter">L</span>

            <div className="cupcakeCircle box">
                <div className="cupcakeInner box">
                    <div className="cupcakeCore box" />
                </div>
            </div>

            <span className="letter box">A</span>
            <span className="letter box">D</span>
            <span className="letter box">I</span>
            <span className="letter box">N</span>
            <span className="letter box">G</span>
        </div>
    )
}

export default Loader
