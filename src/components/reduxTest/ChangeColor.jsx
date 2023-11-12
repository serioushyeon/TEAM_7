import React, {useState} from 'react'

function ChangeColor() {
    const [color, setColor] = useState('');
    return (
        <div>
            <input 
                type="text" 
                onChange={e => {
                    setColor(e.target.value);
                }}
            />
            <button>색상 변경(아직안됨)</button>
        </div>
    )
}

export default ChangeColor