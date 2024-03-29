import styles from '@/styles/Users.module.scss';
import cnBind from 'classnames/bind';
import {PageLayout} from "@/layouts/PageLayout";
import {apiGetWorkingPeriods} from "@/api/apiGetWorkingPeriods";
import {GetServerSideProps} from "next";
import {WorkingPeriod} from "@/types";
import {useCallback, useState} from "react";
import {apiCreateWorkingPeriod} from "@/api/apiCreateWorkingPeriod";
import {DayCard} from "@/components/DayCard/DayCard";
import {apiCreateProject} from "@/api/apiCreateProject";
import {apiStartTimer} from "@/api/apiStartTimer";
import {apiStopTimer} from "@/api/apiStopTimer";
const cx = cnBind.bind(styles);

interface TrackerPageProps {
    workingPeriods: WorkingPeriod[],
}
export default function TrackerPage({workingPeriods}: TrackerPageProps) {
    const [ periods, setPeriods ] = useState(workingPeriods);

    const createWPToday = () => {
        (async () => {
            const response = await apiCreateWorkingPeriod(1);
            setPeriods((prev) => ([response, ...prev]))
        })()
    }
    const createProject = useCallback(async ({title, id}: {title: string, id: string}) => {
        const request = await apiCreateProject({title, working_period_id: id});
        setPeriods((prev) =>
            prev.map((el) =>
                el._id === id ? {...el, assignedProjects: [...el.assignedProjects, request]} : el
            )
        )
    }, []);
    const startTimer = useCallback(async (project_id: string) => {
        const request = await apiStartTimer({project_id: project_id});
        setPeriods((prev) => {
            return prev.map((period) => {
                const isCurrentPeriod = period._id === request.assignedWorkingPeriod;
                if (!isCurrentPeriod) { return period; }

                return ({
                    ...period,
                    assignedProjects: period.assignedProjects.map((project) =>
                        project._id === request._id ? request : project)
                })
            });
        })
    }, [])
    const stopTimer = useCallback(async (project_id: string) => {
        const request = await apiStopTimer({project_id: project_id});
        setPeriods((prev) => {
            return prev.map((period) => {
                const isCurrentPeriod = period._id === request.assignedWorkingPeriod;
                if (!isCurrentPeriod) { return period; }

                return ({
                    ...period,
                    assignedProjects: period.assignedProjects.map((project) =>
                        project._id === request._id ? request : project)
                })
            });
        })
        console.log(request);
    }, [])

    return (
        <PageLayout title={`Трекер`}>
            <div className={cx('content')}>
                <div>
                    <button onClick={createWPToday}>Хочу работать!</button>
                </div>
                {periods.map((el) => (
                    <DayCard
                        key={el.createdTime}
                        workingPeriodData={el}
                        onStartTimer={startTimer}
                        onProjectCreate={createProject}
                        onStopTimer={stopTimer}
                    />
                ))}
            </div>
        </PageLayout>
    )
};

export const getServerSideProps: GetServerSideProps = async () => {
    const workingPeriods = await apiGetWorkingPeriods();
    return ({ props: { workingPeriods } });
}