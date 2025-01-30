import Loader from './Dashboard/Loader';

export default function LoadingScreen() {
    return (
        <div
            id="theme"
            data-theme="dark"
            className="fixed left-0 top-0 z-50 h-full w-full bg-bg-normal bg-opacity-90"
        >
            <div className="flex h-full w-full scale-150 items-center justify-center text-accent">
                <Loader />
            </div>
        </div>
    );
}
