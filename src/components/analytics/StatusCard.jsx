import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './analytics.css'

const StatusCard = ({ icon, title, value, link, type, color }) => {
    const history = useHistory();
    const [preValueSymbol, setPreValueSymbol] = useState("");

    const handleClick = () => {
        if (link)
            history.push(link);
    };

    // Checks for values like dollar and date (eventually)
    useEffect(() => {
        switch (type) {
            case "currency":
                setPreValueSymbol("$");
                break;
            default:
                setPreValueSymbol("");
        }
    }, [type])

    return (
        <div className="analytics status-card" onClick={handleClick} style={{ backgroundColor: color }}>
            <div className="status-card status-card-icon">
                {icon}
            </div>

            <div className="status-card status-card-info">
                <span className="status-card status-card-title">{title}</span>
                <span className="status-card status-card-value">{preValueSymbol}{value}</span>
            </div>
        </div>
    );
}

export default StatusCard;