import StatusCard from "../components/analytics/StatusCard"
import { Bag, Star, BagCheck, Receipt } from 'react-bootstrap-icons';

const AnalyticsPage = () => {

    return (
        <div className="analytics-container">
            <StatusCard link="/orders" icon={<Bag size={36} />} title="Pending Orders" value="5" />
            <StatusCard link="/invalid-link" icon={<Star size={36} />} title="Rating" value="4" />
            <StatusCard link="/orders" icon={<BagCheck size={36} />} title="Completed Orders" value="25" />
            <StatusCard link="/orders" icon={<Receipt size={36} />} title="Sales" value="2500" type="currency" />
        </div>

    );
}

export default AnalyticsPage;