import {WorkingPeriod} from "@/types";
import {format} from 'date-fns'
import cnBind from 'classnames/bind';
import styles from './DayCard.module.scss';
import {ItemProject} from "@/components/DayCard/ItemProject/ItemProject";
import {useCallback} from "react";
import {useTimer} from "@/hooks/useTimer";
import {formatDuration} from "@/utils";
const cx = cnBind.bind(styles);

interface DayCardProps {
    workingPeriodData: WorkingPeriod,
    onProjectCreate: ({title, id}: {title: string, id: string}) => void;
    onStartTimer: (val: string) => void;
    onStopTimer: (val: string) => void;
}

export const DayCard = ({ workingPeriodData, onProjectCreate, onStartTimer, onStopTimer }: DayCardProps) => {
    const { assignedProjects, assignedTimeEntries, assignedDay } = workingPeriodData;
    const timerCallback = useCallback((prev: number) => prev === 0 ? Date.now() : prev + 1000, []);
    const currentTime = useTimer({callback: timerCallback, interval: 1000});
    const totalTime = assignedProjects.reduce((acc: number, curr) => acc += curr.totalTime, 0);
    const totalTimeDate = format(assignedDay, 'dd MMMM yyy');
    
    const handleProjectCreate = useCallback(async () => {
        const title = await prompt('Введите название проекта') || 'unset';
        onProjectCreate({id: workingPeriodData._id, title: title})
    }, [onProjectCreate, workingPeriodData._id])
    const handleStartTimer = useCallback(async (project_id: string) => {
        onStartTimer(project_id)
    }, [onStartTimer])
    const handleStopTimer = useCallback(async (project_id: string) => {
        onStopTimer(project_id)
    }, [onStopTimer])

    return (
        <div className={cx('day-card')}>
            <div className={cx('header')}>
                <span>{totalTimeDate}</span>
                <button onClick={handleProjectCreate}>CreateProject</button>
                <span>Total time: {formatDuration(totalTime)}</span>
            </div>
            <div>
                {assignedProjects.map((el) =>
                    <ItemProject key={el._id} projectData={el} onStart={handleStartTimer} onStop={handleStopTimer} />
                )}
            </div>
        </div>
    );
};