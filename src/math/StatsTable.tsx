import { faLightbulb, faStopwatch, faTrophy, faX } from "@fortawesome/free-solid-svg-icons";
import { GameMode } from "../engine/types/GameMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function StatsTable(props: { mode: GameMode }) {
    return <>
        <table className="table table-lg mx-auto" style={{ textAlign: 'center' }}>
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">
                        <FontAwesomeIcon className="font-awesome-icon" icon={faTrophy} />
                        <span className="d-none me-1 d-xl-inline">Victories</span>
                    </th>
                    <th scope="col">
                        <FontAwesomeIcon className="font-awesome-icon" icon={faStopwatch} />
                        <span className="d-none me-1 d-xl-inline">Time</span>
                    </th>
                    <th scope="col">
                        <FontAwesomeIcon className="font-awesome-icon" icon={faX} />
                        <span className="d-none me-1 d-xl-inline">Mistakes</span>
                    </th>
                    <th scope="col">
                        <FontAwesomeIcon className="font-awesome-icon" icon={faLightbulb} />
                        <span className="d-none me-1 d-xl-inline">Hints</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Easy</th>
                    <td>45</td>
                    <td>56:90</td>
                    <td>1.45</td>
                    <td>3.56</td>
                </tr>
                <tr>
                    <th scope="row">Medium</th>
                    <td>45</td>
                    <td>56:90</td>
                    <td>1.45</td>
                    <td>3.56</td>
                </tr>
                <tr>
                    <th scope="row">Hard</th>
                    <td>Larry</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                </tr>
                <tr>
                    <th scope="row">Expert</th>
                    <td>45</td>
                    <td>56:90</td>
                    <td>1.45</td>
                    <td>3.56</td>
                </tr>
            </tbody>
        </table>
    </>
}