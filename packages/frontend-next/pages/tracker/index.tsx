import styles from '@/styles/Users.module.scss';
import cnBind from 'classnames/bind';
import {PageLayout} from "@/layouts/PageLayout";
import {getWorkingPeriods} from "@/api/getWorkingPeriods";
import {GetServerSideProps} from "next";
import {WorkingPeriod} from "@/types";
import {getSlicedTimestamp} from "@test/backend-nest/dist/_Common/Utils";
import {useState} from "react";
import {createWorkingPeriod} from "@/api/createWorkingPeriod";
const cx = cnBind.bind(styles);

interface TrackerPageProps {
    workingPeriods: WorkingPeriod[],
}
export default function TrackerPage({workingPeriods}: TrackerPageProps) {
    console.log(workingPeriods)
    const [ periods, setPeriods ] = useState(workingPeriods);
    const todayTimestamp = getSlicedTimestamp(new Date());
    const currentDayAlreadyAssigned = periods.some((el) => el.assignedDay === todayTimestamp);
    const createWPToday = () => {
        (async () => {
            const response = await createWorkingPeriod(new Date());
            setPeriods((prev) => ([...prev, response]))
        })()
    }


    return (
        <PageLayout title={`Трекер`}>
            <div className={cx('content')}>
                <div>
                    <button onClick={createWPToday}>Хочу работать!</button>
                </div>
                {/*/!*{currentDayAlreadyAssigned &&}*/}
                {workingPeriods.map((el) => (
                    <div key={el.createdTime}>
                        {el.assignedDay}
                    </div>
                ))}
            </div>
        </PageLayout>
    )
};

export const getServerSideProps: GetServerSideProps = async () => {
    const workingPeriods = await getWorkingPeriods();
    return ({ props: { workingPeriods } });
}