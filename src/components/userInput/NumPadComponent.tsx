import "./NumPadComponent.css"


export function NumPadComponent(props: { onNumberPressed: (value: number) => void }) {
    return (<div className="my-5">
        <div className="d-grid gap-2 d-flex justify-content-between">
            <button type="button" className="num btn btn-outline-secondary" onPointerDown={() => props.onNumberPressed(1)}>1</button>
            <button type="button" className="num btn btn-outline-secondary" onPointerDown={() => props.onNumberPressed(2)}>2</button>
            <button type="button" className="num btn btn-outline-secondary" onPointerDown={() => props.onNumberPressed(3)}>3</button>
        </div>
        <div className="d-grid gap-2 d-flex justify-content-between my-2">
            <button type="button" className="num btn btn-outline-secondary" onPointerDown={() => props.onNumberPressed(4)}>4</button>
            <button type="button" className="num btn btn-outline-secondary" onPointerDown={() => props.onNumberPressed(5)}>5</button>
            <button type="button" className="num btn btn-outline-secondary" onPointerDown={() => props.onNumberPressed(6)}>6</button>
        </div>
        <div className="d-grid gap-2 d-flex justify-content-between">
            <button type="button" className="num btn btn-outline-secondary" onPointerDown={() => props.onNumberPressed(7)}>7</button>
            <button type="button" className="num btn btn-outline-secondary" onPointerDown={() => props.onNumberPressed(8)}>8</button>
            <button type="button" className="num btn btn-outline-secondary" onPointerDown={() => props.onNumberPressed(9)}>9</button>
        </div>
    </div>);
}
