import './NumPadComponent.css'

export function NumPadComponent(props: { onNumberPressed: (value: number) => void }) {
    const numComponents = Array.from(Array(9).keys()).map((value) => {
        return (
            <div key={value} className="col-auto col-sm-4" style={{ textAlign: 'center' }}>
                <button
                    type="button"
                    className="btn btn-outline-secondary pad-number"
                    onPointerDown={() => props.onNumberPressed(value + 1)}
                >
                    {value + 1}
                </button>
            </div>
        )
    })

    return <div className="row justify-content-between g-0 mx-2">{numComponents}</div>
}
