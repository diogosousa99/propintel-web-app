import { ModuleTitle } from '@components';

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-6 px-12 py-22 h-full">
            <ModuleTitle title="Dashboard" subtitle="Global indicators of the portfolio" />
        </div>
    );
}
