import {Project} from "@/types";
import {useCallback, useEffect, useState} from "react";

import styles from './ItemProject.module.scss';
import cnBind from 'classnames/bind';
import {useTimer} from "@/hooks/useTimer";
import {format} from "date-fns";
import {formatDuration} from "@/utils";
const cx = cnBind.bind(styles);

interface ItemProjectProps {
    projectData: Project,
    onStart: (id: string) => void;
    onStop: (id: string) => void;
}
export const ItemProject = ({ projectData, onStart, onStop }: ItemProjectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const isRunning = projectData.assignedTimeEntries.some((el) => el.end === null);
    const timerCallback = useCallback((prev: number) => prev === 0 ? Date.now() : prev + 1000, []);
    const currentTime = useTimer({callback: timerCallback, interval: 1000}, isRunning);
    const totalTime = projectData.assignedTimeEntries.reduce<number>((acc: number, curr) => acc += ((curr.end || currentTime) - curr.start), 0);

    return (
        <div className={cx('item-project')}>
            <div className={cx('item-project-content')}>
                <div className={cx('item-count')} onClick={() => setIsOpen((prev) => !prev)}>
                    {projectData.assignedTimeEntries.length }
                </div>
                <div>{projectData.title}</div>
                <div>{projectData._id}</div>

                {isRunning ? (
                    <button onClick={() => onStop(projectData._id)}>Stop</button>
                ) : (
                    <button onClick={() => onStart(projectData._id)}>Start</button>
                )}

                <div>{formatDuration(totalTime)}</div>
            </div>
            {isOpen && (
                <div className={cx('time-entries-list')}>
                    {projectData.assignedTimeEntries.map((el) => (
                        <div key={el._id}>
                            <span>{el._id}</span>
                            <span>
                                <span>Старт: ${format(el.start, 'hh:mm:ss')}</span>
                                <span>Конец: ${el.end ? format(el.end, 'hh:mm:ss') : '---'}</span>
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};