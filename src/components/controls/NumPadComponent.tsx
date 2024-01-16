import { useContext } from 'react'
import { BoardContext } from '../../App'
import './NumPadComponent.css'

export function NumPadComponent(props: { onNumberPressed: (value: number) => void }) {
    const board = useContext(BoardContext)

    const numComponents = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        .filter((value) => board.isNumberAllowed(value))
        .map((value) => {
            return (
                <div key={value} className="col-auto col-sm-4" style={{ textAlign: 'center' }}>
                    <button
                        type="button"
                        className="btn btn-secondary pad-number"
                        onPointerDown={() => props.onNumberPressed(value)}
                    >
                        {value}
                    </button>
                </div>
            )
        })

    return <div className="row justify-content-between g-0 mx-2">{numComponents}</div>
}
