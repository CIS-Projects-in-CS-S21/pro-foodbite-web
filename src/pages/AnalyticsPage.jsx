import StatusCard from "../components/analytics/StatusCard"
import { Bag, Star, Receipt } from 'react-bootstrap-icons';

const AnalyticsPage = () => {

    return (
        <div className="analytics-container" style={{width: "70"}}>
            <StatusCard link="/orders" icon={<Bag size={36} />} title="Orders"/>
            <StatusCard link="/sales" icon={<Receipt size={36} />} title="Sales"/>
            <StatusCard link="/my-ratings" icon={<Star size={36} />} title="Reviews"/>
            {/* <StatusCard link="/orders" icon={<BagCheck size={36} />} title="Completed Orders" value="25" /> */}
        </div>

    );
}

export default AnalyticsPage;