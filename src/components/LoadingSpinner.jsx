import { ScaleLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div className="h-[75vh] flex justify-center items-center">
            <ScaleLoader color="rgb(22 163 74)" />
        </div>
    );
};

export default LoadingSpinner;