import Appointment from "./Appointment";
import Guide from "./Guide";

interface GuideSchedule {
    _id: string
    ScheduleDate: any
    Period: string //"Morning" "Afternoon" "All-day"
    Available: boolean
    WorkOnAppointment?: Appointment
    Status: {
        Tag: string
        Details: string[]
    }
}

export default GuideSchedule