import { Link } from "react-router-dom";

const CollegeCard = ({ college }) => {

    const { image, name, admissionDate, researchWorks, sports, _id } = college

    return (
        <div className="border rounded-md">
            <img className="rounded-md object-cover" src={image} alt="" />
            <div className="p-3 space-y-2">
                <h1 className="font-semibold text-xl">{name}</h1>
                <p><span className="font-semibold text-lg">Admission: </span>{admissionDate}</p>
                <p><span className="font-semibold text-lg">Research Work: </span>{researchWorks.length}</p>
                <p><span className="font-semibold text-lg">Sports: </span>{sports.map(s => <span className="inline-block" key={s}>{s},</span>)}</p>
            </div>
            <div className="flex justify-center pb-4">
                <button className="my-btn">
                    <Link to={`/college/${_id}`}>Details</Link>
                </button>
            </div>
        </div>
    );
};

export default CollegeCard;